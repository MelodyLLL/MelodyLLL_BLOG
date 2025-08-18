# 全局定时器

适用于公司如小程序，添加活动倒计时的场景，在瀑布墙等组件中会有非常多的倒计时。如果每个使用一个 setTimeout，点击到详情页内部再次渲染瀑布墙会导致性能问题，页面卡顿。下面的三个重点：

1. 时间补偿机制
   通过公式 startTime + count \* fps - currentTime 动态调整下次执行时间，避免累计误差。

2. 集中式管理
   所有定时任务由单个 setTimeout 驱动，比原生多个定时器更节省资源。

3. 全局缓存
   GlobalTickerCache 实现同帧率 Ticker 的单例复用。

```js
'use strict';
const GlobalTickerCache = {};

class Ticker {
	constructor(fps = 1000) {
		this.timer = null;
		this.timeoutCallbacks = Object.create(null);
		this.intervalCallbacks = Object.create(null);
		this.count = 0;
		this.timerId = 0;
		this.isRun = false;
		this.fps = fps;
	}

	/**
	 * 开始计时
	 */
	start() {
		if (this.isRun) return; // 防止重复启动

		this.startTime = Date.now();
		this.count = 0;
		this.isRun = true;
		this.execute();
	}

	/**
	 * 暂停
	 */
	pause() {
		clearTimeout(this.timer);
		this.isRun = false;
	}

	/**
	 * 停止
	 */
	stop() {
		clearTimeout(this.timer);
		this.isRun = false;
	}

	/**
	 * 恢复
	 */
	resume() {
		this.start();
	}

	/**
	 * 清除所有任务
	 */
	clear() {
		this.timeoutCallbacks = Object.create(null);
		this.intervalCallbacks = Object.create(null);

		// 新增：从缓存中移除空闲实例
		// if (
		// 	Object.keys(this.timeoutCallbacks).length === 0 &&
		// 	Object.keys(this.intervalCallbacks).length === 0
		// ) {
		// 	delete GlobalTickerCache[this.fps];
		// }
	}

	/**
	 * 定时执行，只执行一次
	 * @param {Function} callback
	 * @return {number}
	 */
	setTimeout(callback) {
		this.timeoutCallbacks[++this.timerId] = callback;
		return this.timerId;
	}

	/**
	 * 定时执行，会重复执行
	 * @param {Function} callback
	 * @return {number}
	 */
	setInterval(callback) {
		this.intervalCallbacks[++this.timerId] = callback;
		return this.timerId;
	}

	/**
	 * 移除定时器
	 * @param {number} timerId
	 */
	clearTimeout(timerId) {
		delete this.timeoutCallbacks[timerId];
	}

	/**
	 * 移除定时器
	 * @param {number} timerId
	 */
	clearInterval(timerId) {
		delete this.intervalCallbacks[timerId];
	}

	execute() {
		clearTimeout(this.timer);
		this.tick();

		if (this.isRun) {
			this.lastTime = Date.now();
			const nextFps = this.startTime + ++this.count * this.fps - this.lastTime;
			this.timer = setTimeout(() => this.execute(), nextFps);
		}
	}

	tick() {
		// 执行一次性回调
		Object.keys(this.timeoutCallbacks).forEach((timerId) => {
			const callback = this.timeoutCallbacks[timerId];
			try {
				typeof callback === 'function' && callback();
			} catch (error) {
				console.error(error);
			}
			delete this.timeoutCallbacks[timerId];
		});

		// 执行周期性回调
		Object.keys(this.intervalCallbacks).forEach((timerId) => {
			const callback = this.intervalCallbacks[timerId];
			try {
				typeof callback === 'function' && callback();
			} catch (error) {
				console.error(error);
			}
		});
	}
}

/**
 * 创建Ticker实例
 * @param {number} [fps=1000] 帧率，单位毫秒
 * @return {Ticker}
 */
function createTicker(fps = 1000) {
	let ticker = GlobalTickerCache[fps];
	if (!ticker) {
		ticker = new Ticker(fps);
		GlobalTickerCache[fps] = ticker;
	}
	ticker.start();
	return ticker;
}

export { Ticker, createTicker };
```
