# NodeJS 和服务器

## js 模块导出的两种方式？

在 Node.js 中，有两种主要的导出模块的方式：CommonJS 和 ES6 的导出方式。下面是它们的主要区别：

CommonJS（Node.js 模块系统）：

- 导出方式： 使用 module.exports 或 exports。
- 导入方式： 使用 require。
- 特点： 是 Node.js 最早引入的模块系统，它是同步加载的，模块在运行时动态加载，适用于服务器端编程。
- 示例：

```js
// 导出模块
// file.js
const someFunction = () => {
	// some code
};

module.exports = someFunction;
// 或者
// exports.someFunction = someFunction;

// 导入模块
// anotherFile.js
const importedFunction = require('./file');
```

ES6 模块系统：

- 导出方式： 使用 export 和 export default。
- 导入方式： 使用 import。
- 特点： 是 ECMAScript 6 引入的模块系统，是异步加载的，支持静态分析，可以在浏览器端和服务器端使用。
- 示例：

```js
// 导出模块
// file.js
export const someFunction = () => {
	// some code
};

// 导入模块
// anotherFile.js
import { someFunction } from './file';
```

在 Node.js 中，CommonJS 是默认的模块系统，但是在很多现代的 Node.js 应用中，也可以使用 import 和 export 关键字，因为 Node.js 已经开始支持部分 ES6 模块语法。

ES6 模块系统更加现代化，支持静态分析和 tree-shaking，有助于构建更轻量的应用。在新项目中，推荐使用 ES6 模块。

## 知道洋葱模型吗？

洋葱模型是 Koa 中间件执行流程的核心机制，它实现了请求从外到内、再从内到外依次通过所有中间件的处理过程。下面详细解析其实现原理。

1. 洋葱模型的基本概念
   洋葱模型形象地描述了请求处理的流程：

进入阶段：请求从第一个中间件开始，依次通过各个中间件，直到最内层

返回阶段：从最内层中间件开始，逆序返回经过各个中间件，直到第一个中间件结束

2. 核心实现机制
   2.1 中间件的组合（compose）
   Koa 使用 koa-compose 模块将多个中间件组合成一个函数：

```js
function compose(middleware) {
	return function (context, next) {
		let index = -1;
		return dispatch(0);

		function dispatch(i) {
			if (i <= index)
				return Promise.reject(new Error('next() called multiple times'));
			index = i;
			let fn = middleware[i];
			if (i === middleware.length) fn = next;
			if (!fn) return Promise.resolve();
			try {
				return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
			} catch (err) {
				return Promise.reject(err);
			}
		}
	};
}
```

2.2 执行流程解析

以一个包含 3 个中间件的应用为例：

```js
const Koa = require('koa');
const app = new Koa();

// 中间件1
app.use(async (ctx, next) => {
	console.log('1-start');
	await next();
	console.log('1-end');
});

// 中间件2
app.use(async (ctx, next) => {
	console.log('2-start');
	await next();
	console.log('2-end');
});

// 中间件3
app.use(async (ctx) => {
	console.log('3');
	ctx.body = 'Hello';
});

app.listen(3000);
```

执行顺序：

```shell
1-start
2-start
3
2-end
1-end
```

2.3 执行流程详解
请求进入时，执行第一个中间件：

执行 console.log('1-start')

遇到 await next()，暂停当前中间件，进入下一个中间件

执行第二个中间件：

执行 console.log('2-start')

遇到 await next()，暂停当前中间件，进入下一个中间件

执行第三个中间件：

执行 console.log('3')

没有 next()，中间件执行完毕，开始返回

返回到第二个中间件：

继续执行 await next() 之后的代码：console.log('2-end')

返回到第一个中间件：

继续执行 await next() 之后的代码：console.log('1-end')

3. 关键实现细节

3.1 next 函数的作用
每个中间件接收的 next 参数实际上是下一个中间件的包装函数。调用 next() 就是执行下一个中间件。

3.2 Promise 链
Koa2 使用 Promise 链来管理中间件的执行顺序：

每个中间件都被包装成 Promise

await next() 会等待下一个中间件的 Promise 解析完成

这使得中间件可以按顺序执行，并且能正确处理异步操作

3.3 错误处理
洋葱模型的错误处理也是按照洋葱顺序：

可以在中间件中使用 try/catch 捕获下游中间件的错误

错误会沿着中间件链反向传播

```js
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = 500;
		ctx.body = 'Internal Server Error';
	}
});
```

## ssr 了解吗？

ssr 也就是服务端渲染，也就是把 vue 在客户端把标签渲染成 HTML·的工作放在服务端完成，然后再把 html 直接返回给客户端。
服务器渲染只支持 created 和 beforeCreated 两个钩子，ssr 有着更好的 seo，首屏加载速度更快。

## nginx 常用配置

**主配置文件（通常位于 /etc/nginx/nginx.conf 或 /etc/nginx/sites-enabled/default）**

### 单域名部署多项目

- root：用于定义基础路径，请求的 URI 会直接拼接到 root 指定的目录后。
- alias：用于路径替换，匹配的 location 路径（如 /test）会被替换为 alias 指定的目录。

- 子域名配置

```bash
server {
    listen 80;
    server_name admin.example.com;  # 子域名1
    root /var/www/admin-project/dist;  # 项目1的打包目录
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;  # 支持前端路由（如Vue/React的history模式）
    }
}

server {
    listen 80;
    server_name app.example.com;    # 子域名2
    root /var/www/app-project/dist; # 项目2的打包目录
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

- 多路径映射

```bash
location /test {
    alias /www/test_web/dist;
    index index.html;
    try_files $uri $uri/ /index.html;
}

location / {
    root /www/web/dist;
    index index.html;
    try_files $uri $uri/ /index.html;
}
```

### GZIP 压缩

```bash
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1k;
```

### 静态文件缓存

```bash
location /static/ {
    alias /var/www/app-project/dist/static/;
    expires 1y;  # 长期缓存
    add_header Cache-Control "public";
}
```

### 证书配置

```bash
server {
    listen 443 ssl;
    server_name admin.example.com;
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
}
```
