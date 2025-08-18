# 任务中心（上传与下载）

## 1.分片上传

### 1.1 关键点

- **文件切片**：使用 `slice` 方法处理 `Blob` 对象，将大文件拆分为多个小块（分片）。
- **文件哈希**：为实现秒传与断点续传，需对文件进行哈希。可采用增量哈希，或仅取文件首尾及中间部分字节进行哈希，以降低内存消耗。

### 1.2 代码示例，分片 hash

```js
/**
 * 计算文件的hash值，计算的时候并不是根据所用的切片的内容去计算的，那样会很耗时间，我们采取下面的策略去计算：
 * 1. 第一个和最后一个切片的内容全部参与计算
 * 2. 中间剩余的切片我们分别在前面、后面和中间取2个字节参与计算
 * 这样做会节省计算hash的时间
 */
const calculateHash = async (fileChunks: Array<{file: Blob}>) => {
  return new Promise(resolve => {
    const spark = new sparkMD5.ArrayBuffer()
    const chunks: Blob[] = []

    fileChunks.forEach((chunk, index) => {
      if (index === 0 || index === fileChunks.length - 1) {
        // 1. 第一个和最后一个切片的内容全部参与计算
        chunks.push(chunk.file)
      } else {
        // 2. 中间剩余的切片我们分别在前面、后面和中间取2个字节参与计算
        // 前面的2字节
        chunks.push(chunk.file.slice(0, 2))
        // 中间的2字节
        chunks.push(chunk.file.slice(CHUNK_SIZE / 2, CHUNK_SIZE / 2 + 2))
        // 后面的2字节
        chunks.push(chunk.file.slice(CHUNK_SIZE - 2, CHUNK_SIZE))
      }
    })

    const reader = new FileReader()
    reader.readAsArrayBuffer(new Blob(chunks))
    reader.onload = (e: Event) => {
      spark.append(e?.target?.result as ArrayBuffer)
      resolve(spark.end())
    }
  })
}

```

- **上传重试与并发控制**：支持分片上传失败后的重试机制，并通过 `p-limit` 或 `Promise.race` 控制并发上传数量。

### 1.3 代码示例，带上传重试逻辑

```js
import pLimit from 'p-limit';

// 分片上传核心函数
export async function uploadFileInChunks({
	file,
	chunkSize = 1 * 1024 * 1024, // 默认每片1MB
	concurrency = 5,
	retryCount = 3,
	uploadFn, // (chunk: Blob, index: number, total: number) => Promise
	onProgress, // (uploaded: number, total: number) => void
}) {
	const totalChunks = Math.ceil(file.size / chunkSize);
	const chunks = Array.from({ length: totalChunks }, (_, i) => {
		const start = i * chunkSize;
		const end = Math.min(start + chunkSize, file.size);
		return file.slice(start, end);
	});

	let uploaded = 0;
	const limit = pLimit(concurrency);

	const retryWrapper = (chunk, index) =>
		limit(async () => {
			for (let i = 0; i < retryCount; i++) {
				try {
					await uploadFn(chunk, index, totalChunks);
					uploaded++;
					onProgress?.(uploaded, totalChunks);
					return;
				} catch (err) {
					if (i === retryCount - 1) {
						throw new Error(
							`Chunk ${index} upload failed after ${retryCount} attempts`
						);
					}
				}
			}
		});

	const tasks = chunks.map((chunk, index) => retryWrapper(chunk, index));
	const results = await Promise.allSettled(tasks);

	const failed = results
		.map((r, i) => (r.status === 'rejected' ? i : -1))
		.filter((i) => i !== -1);

	if (failed.length > 0) {
		throw new Error(`Some chunks failed: ${failed.join(', ')}`);
	}
}
```

### 1.4 代码示例，使用 Promise.race 控制并发

```js
async function uploadWithConcurrency(formDatas: any[], max = 6) {
	const taskPool: Promise<any>[] = [];
	let index = 0;

	const createTask = (data: any) => {
		const task = fetch('/upload', {
			method: 'POST',
			body: data,
		}).catch((err) => {
			console.error('上传失败', err);
		});

		// 添加完成后的清理操作
		task.finally(() => {
			const i = taskPool.indexOf(task);
			if (i !== -1) taskPool.splice(i, 1);
		});

		return task;
	};

	while (index < formDatas.length) {
		const task = createTask(formDatas[index]);
		taskPool.push(task);

		// 控制并发数，满了就等待任意一个完成
		if (taskPool.length >= max) {
			await Promise.race(taskPool);
		}

		index++;
	}

	// 等待所有剩余任务完成
	await Promise.all(taskPool);
}
```

## 2. 断点续传

断点续传是指在上传过程中断后，能够从上次中断的位置继续上传，避免重复上传已完成的分片。实现思路如下：

- **分片状态记录**：前端可通过本地存储（如 IndexedDB）或后端接口记录已上传分片的索引。
- **上传前校验**：上传前先向后端查询已上传分片列表，仅上传未完成的分片。
- **秒传优化**：通过文件哈希判断文件是否已存在，若存在则直接返回上传成功。

## 3. 下载任务管理

大文件下载可采用后端异步处理，前端通过轮询接口查询任务状态，提升用户体验与系统稳定性。

### 优化点

- **任务中心入口提示**：为避免用户找不到任务中心，可在页面增加“去任务中心查看”入口，或采用类似购物车的动画提示。
- **动画实现**：可利用 `translate3d` 和二阶贝塞尔曲线实现文件加入任务中心的动画效果，提升交互体验。
