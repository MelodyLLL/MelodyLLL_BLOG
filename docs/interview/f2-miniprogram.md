# 小程序

这里记录一些“国内特色”的开发生态，如微信小程序、公众号、支付宝小程序、快应用等，如果没有特殊说明，小程序泛指微信小程序

## 关于小程序新的 skyline 架构

1. 老架构师基于 webview 与 jscore 等双线程，在 webview 中过会运行 dom 的构造，css 的计算等。在 jscore 中运行 js 逻辑。并且通过 jsbridge 进行与 webview 的通信。
2. 新架构将 webview 的部分渲染逻辑移动到新的线程中，并且在 jscore 中划分上下文，进行内存通信。减少了 webview 的处理逻辑与通信时间。因此如 wxs 等也被移动到 jscore 线程中，这导致了其本来可以同步获取页面信息现在必须异步，因此又有了新的
   worklet 机制代替

> [理解微信小程序的双线程模型 - JunpengZ - 博客园](https://www.cnblogs.com/ihardcoder/p/14778013.html)

## 微信小程序的 WXS 运行在逻辑层还是渲染层？

微信小程序中的 WXS (WeiXin Script) 运行在渲染线程(也即 WebView) 中，而不是逻辑层(App Service)。WXS 是一种专为小程序视图层设计的脚本语言，用于在 WXML 中进行数据处理和转换，类似于 Vue.js 中的计算属性。
不过在新的 Skyline 渲染引擎中这一点似乎有变化，WXS 被移到 AppService 中。

## 小程序的滚动穿透问题

- 底部页面最外层 view 设置 position: fixed;页面不可滚动，但是这个时候会导致页面回到顶部。关闭需要恢复 body 定位，设置回之前滚动的位置
- 引入 body-scroll-lock
- 弹出组件增加 `catchtouchmove="return"`，弹窗滚动区域再使用`scroll-view`包裹。

## 小程序怎么实现类似 Vue 的 mixin 的功能

在微信小程序中，虽然没有内置类似 Vue 中 mixin 的功能，但你可以通过一些手段来实现类似的效果。下面是一种常见的实现方式：

1. **使用全局变量或全局函数**：在小程序的 app.js 文件中定义全局变量或全局函数，然后在需要使用 mixin 功能的页面或组件中引入并使用这些全局变量或函数。

```javascript
// app.js
App({
	globalData: {
		// 定义全局变量
		globalVariable: 'I am a global variable',
	},
	globalFunction: function () {
		// 定义全局函数
		console.log('I am a global function');
	},
});
```

2. **通过继承实现 mixin**：在小程序中，可以通过对象的继承来实现 mixin 的功能。定义一个基础对象，然后在需要使用 mixin 功能的页面或组件中继承这个基础对象，并添加自己的业务逻辑。

```javascript
// mixin.js
module.exports = {
	data: {
		mixinData: 'Mixin Data',
	},
	onLoad: function () {
		console.log('Mixin onLoad');
	},
};

// page.js
const mixin = require('mixin.js');
Page({
	mixins: [mixin],
	onLoad: function () {
		console.log('Page onLoad');
	},
});
```

这样做的话，`mixin.js` 中定义的 `data` 和 `onLoad` 方法会被合并到 `page.js` 的 `data` 和 `onLoad` 方法中。

虽然在小程序中没有像 Vue 那样原生支持的 mixin 功能，但通过以上方式，你可以实现类似的效果，提高代码的复用性和可维护性。

## 小程序优化

**微信小程序的启动优化对于提升用户体验至关重要。以下是一些微信小程序启动优化的常见方法：1-5 点为小程序自带配置**

1. 优化代码包体积，通过分包以及分包预下载、分包异步化等策略。
2. 自基础库版本 2.11.1 起，可以通过开启「按需注入」特性避免不必要的代码注入和执行，以降低小程序的启动时间和运行时内存(app.json 中 usingComponents 配置的全局自定义组件会被视为页面依赖)
3. 在打开上述「按需注入」特性的前提下，可以通过「用时注入」特性使一部分自定义组件不在启动时注入，而是在真正被渲染时才进行注入，进一步降低小程序的启动和首屏时间。
4. 自基础库版本 2.11.1 起，小程序支持启用初始渲染缓存。可以不需要等待逻辑层初始化完毕渲染一些小程序内部组件。
5. 配置小程序自带的数据预拉取功能。
6. 小程序包默认下载会进行算法压缩，但是仍可以对一些静态资源文件进行大小控制，采用小体积图标以及将图片部署到 cdn 图片。
7. 及时清理未使用的代码包。
8. 减少同步 api 的调用，如 getSystemInfo、getStorageSync 等。
9. 避免生命周期中的复杂运算。
10. 在交互上可以精简首屏数据，可以大大降低加载时间。
11. 使用缓存，数据存储在本地，返回的会比网络请求快。
12. 使用骨架屏等提升体验。

**小程序运行时优化**

1. 合理使用 setData，setData 是小程序开发中使用最频繁、也是最容易引发性能问题的接口。
2. 控制小程序页面上的节点数量
3. 适当监听页面或组件的 scroll 事件，可以使用 IntersectionObserver 等其他方式替代
4. 使用非 setData 的方式实现动画
5. 避免 onHide/onUnload 中写复杂逻辑，可以尝试提前请求下个页面的数据，提升切换页面速度。
6. 默认情况下，小程序框架会在当前页面 onReady 触发 200ms 后触发预加载。也可以进行自定义配置，基础库 2.15.0 开始支持，仅安卓。
7. 同启动优化，控制图片等资源大小
8. 避免滥用 image 组件的 widthFix/heightFix 模式，可能会引起页面内大范围的布局重排
9. 及时清理定时器，监听事件等

## 小程序怎么做异常监控

在小程序中实现异常监控可以帮助开发者及时发现和解决程序中的问题，提高应用的稳定性和用户体验。以下是一种常见的异常监控方案：

1. **使用 try-catch 捕获异常**：在小程序的关键代码块中使用 try-catch 结构捕获可能出现异常的代码，如网络请求、数据处理等。

```javascript
try {
	// 可能出现异常的代码块
} catch (e) {
	// 异常处理逻辑
	console.error('An error occurred:', e);
}
```

2. **全局错误监听**：通过监听小程序的错误事件，可以捕获到未被 try-catch 捕获的全局错误，如页面错误、Promise 错误等。

```javascript
App({
	onError: function (error) {
		// 全局错误处理逻辑
		console.error('Global error occurred:', error);
	},
});
```

3. **使用小程序内置的错误监控服务**：微信小程序提供了相关的错误监控服务，开发者可以通过在小程序管理后台配置来开启错误监控，并查看错误信息和统计数据。

4. **自定义错误上报**：在发生异常时，可以通过调用自定义的上报接口将异常信息上报到服务器，以便开发者及时了解问题并进行修复。

```javascript
function reportError(error) {
	// 调用接口上报错误信息
	wx.request({
		url: 'https://example.com/report',
		method: 'POST',
		data: {
			error: error,
		},
		success: function (res) {
			console.log('Error reported successfully:', res);
		},
		fail: function (err) {
			console.error('Failed to report error:', err);
		},
	});
}
```

综合利用以上方法，可以在小程序中建立一个完善的异常监控系统，帮助开发者及时发现和解决程序中的问题。

## 名创小程序购物车部分优化

- 接口拆分，仓、店、换购、无库存商品列表等，先让部分数据进行展示，减少前端整合逻辑
- 猜你喜欢缓存第一页商品
- 预售购物车分包
- 起送，包邮、满赠、换购逻辑整合到wxs