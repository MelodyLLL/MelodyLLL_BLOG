# 前端埋点及监控系统

## 1. 采集数据分类

- **用户交互数据**  
  如点击、滑动、表单提交等用户行为。
- **系统性能数据**  
  页面加载时间、资源加载耗时、首屏渲染时间等。
- **系统异常数据**  
  JS 错误、接口异常、资源加载失败等。

---

## 2. 埋点方式

- **手动埋点（代码埋点）**  
  通过在代码中显式添加埋点逻辑，适合精细化控制，灵活性高，但开发和维护成本较大。
- **可视化埋点**  
  借助可视化工具在页面上标记埋点位置，自动生成埋点代码，适合非技术人员参与，降低开发门槛。
- **无埋点（全埋点）SDK**  
  通过 SDK 自动监听所有用户行为和事件，无需手动指定埋点，适合快速接入和全量数据采集，但数据量大、后期分析压力较大。

---

## 3. 数据上报方式

### 3.1 图片请求（GIF/Pixel）

- **防止跨域**  
  图片的 `src` 属性不会受到跨域限制，常用于数据上报。
- **非阻塞**  
  通过 `new Image()` 方式发送，不影响页面渲染。
- **体积小**  
  最小 GIF 文件仅需 43 字节，节省带宽。
- **兼容性好**  
  几乎所有浏览器都支持。

### 3.2 接口上报（AJAX）

- 通过 `XMLHttpRequest` 或 `fetch` 发送数据到后端接口。
- 可能会遇到跨域、页面刷新丢失等问题。
- 适合需要响应和更复杂数据结构的场景。

### 3.3 Web Beacon

- 使用 `Navigator.sendBeacon` API 实现异步、可靠的数据上报。
- **优点**  
  - 不阻塞主线程，浏览器空闲时发送。
  - 页面卸载（关闭/刷新）时也能保证数据发送。
- **兼容性**  
  - 现代浏览器支持良好，老旧浏览器可用图片请求兜底。

---

## 4. 性能数据采集

- 可通过 `window.performance.timing` 或 `Performance API` 获取页面性能指标，如：
  - DNS 查询耗时
  - TCP 连接耗时
  - 首字节时间（TTFB）
  - DOM 渲染完成时间
  - 页面完全加载时间
- 也可结合 `PerformanceObserver` 监听更细粒度的性能数据（如 FCP、LCP、CLS 等）。

---

## 5. 系统错误采集

### 5.1 JS 错误

- 通过监听 `window.onerror` 捕获运行时错误。
- 常见错误类型：
  - `InternalError`：内部错误（如递归爆栈）
  - `RangeError`：范围错误（如 `new Array(-1)`）
  - `EvalError`：`eval()` 使用错误
  - `ReferenceError`：引用未定义变量
  - `SyntaxError`：语法错误
  - `TypeError`：类型错误（如 `[1,2].split('.')`）
  - `URIError`：URI 处理错误（如 `decodeURI('%2')`）
  - `Error`：通用错误类型

### 5.2 Promise 错误

- 通过监听 `window.onunhandledrejection` 捕获未处理的 Promise 错误。

### 5.3 资源加载错误

- 通过监听 `window.addEventListener('error', ...)` 并判断 `event.target` 类型，捕获图片、脚本、样式等资源加载失败。

### 5.4 框架错误处理

- React：`componentDidCatch`、`ErrorBoundary`
- Vue：`errorCaptured` 钩子

---

## 6. 其他补充

- **数据采集 SDK**  
  推荐使用开源或自研 SDK，支持灵活配置、数据脱敏、批量上报等功能。
- **数据上报优化**  
  - 批量合并上报，减少请求次数
  - 离线缓存，断网后重试
- **数据安全与隐私**  
  - 遵守相关法律法规（如 GDPR）
  - 对敏感数据进行脱敏处理
- **监控平台**  
  - 可接入如 Sentry、Fundebug、阿里云前端监控等平台，快速搭建监控体系。

---

> **参考资料**  
> - [MDN Web Docs - Performance API](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API)
> - [MDN Web Docs - sendBeacon](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)
> - [前端监控最佳实践](https://juejin.cn/post/6844904069415641096)