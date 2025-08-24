# 浏览器和网络相关

## 网络模型结构

OSI 模型（Open Systems Interconnection）是国际标准化组织提出的通用通信模型，分为七层：

| 层级 | 名称       | 作用简述                    |
| ---- | ---------- | --------------------------- |
| 7    | 应用层     | 直接面向用户，如 HTTP、FTP  |
| 6    | 表示层     | 编码/加密/压缩，如 TLS、SSL |
| 5    | 会话层     | 建立/管理/终止会话，如 RPC  |
| 4    | 传输层     | 端到端传输控制，如 TCP/UDP  |
| 3    | 网络层     | 路由选择与逻辑寻址，如 IP   |
| 2    | 数据链路层 | 物理寻址，帧传输，如以太网  |
| 1    | 物理层     | 比特流传输，接头接线等      |

TCP/IP 模型是互联网协议基础，更贴近真实网络实现，分为四层：这个可以记一下！

| 层级 | 名称       | 包含的协议（示例）       |
| ---- | ---------- | ------------------------ |
| 4    | 应用层     | HTTP、FTP、SMTP、DNS     |
| 3    | 传输层     | TCP、UDP                 |
| 2    | 网络层     | IP、ICMP、ARP            |
| 1    | 网络接口层 | 以太网、Wi-Fi 等链路协议 |

## axios、fetch、ajax 区别

Ajax、Axios 和 Fetch 都是用于发送 HTTP 请求的工具，但它们有一些区别：

1. **Ajax**：
   Ajax（Asynchronous JavaScript and XML）是一种在无需重新加载整个网页的情况下，通过后台与服务器进行数据交换的技术。它通常使用 XMLHttpRequest 对象来实现异步通信。
   Ajax 最初是基于原生的 JavaScript 实现的，它可以实现跨域请求和上传文件等操作。但使用原生的 Ajax 需要编写大量的代码，并且在处理请求错误和超时等方面较为繁琐。

2. **Axios**：
   Axios 是一个基于 Promise 的 HTTP 客户端，可以用于浏览器和 Node.js 环境。它支持异步请求和 Promise API，并且提供了简洁的 API 接口，能够轻松处理请求和响应数据。
   Axios 提供了丰富的功能，包括自动转换 JSON 数据、拦截请求和响应、设置请求超时等，使得发送 HTTP 请求变得更加方便和高效。

3. **Fetch**：
   Fetch 是 Web API 的一部分，是一种用于发送和接收网络请求的新型接口。它使用 Promise 来处理请求和响应，提供了一种更加现代化和简洁的方式来处理网络请求。Fetch 是原生的 Web API，不需要额外的库或插件，因此具有更好的性能和可移植性。但它也有一些限制，比如不支持请求超时、不支持上传文件等。

综上所述，Ajax 是一种传统的异步通信技术，Axios 是一个基于 Promise 的 HTTP 客户端库，而 Fetch 是原生的 Web API。Axios 和 Fetch 相比于原生的 Ajax 提供了更加方便和现代化的方式来处理 HTTP 请求。

> [ajax 和 axios、fetch 的区别](https://www.jianshu.com/p/8bc48f8fde75)

## cdn 的概念和作用

CDN 是指内容分发网络，也称内容传送网络，是主要应用内容存储和分发技术在现有网络基础之上构建的智能虚拟网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。

基础架构：最简单的 CDN 网络由一个 DNS 服务器和几台缓存服务器组成：

1. 当用户点击网站页面上的内容 URL，经过本地 DNS 系统解析，DNS 系统会最终将域名的解析权交给 CNAME 指向的 CDN 专用 DNS 服务器。
2. CDN 的 DNS 服务器将 CDN 的全局负载均衡设备 IP 地址返回用户。
3. 用户向 CDN 的全局负载均衡设备发起内容 URL 访问请求。
4. CDN 全局负载均衡设备根据用户 IP 地址，以及用户请求的内容 URL，选择一台用户所属区域的区域负载均衡设备，告诉用户向这台设备发起请求。
5. 区域负载均衡设备会为用户选择一台合适的缓存服务器提供服务，选择的依据包括：根据用户 IP 地址，判断哪一台服务器距用户最近；根据用户所请求的 URL 中携带的内容名称，判断哪一台服务器上有用户所需内容；查询各个服务器当前的负载情况，判断哪一台服务器尚有服务能力。基于以上这些条件的综合分析之后，区域负载均衡设备会向全局负载均衡设备返回一台缓存服务器的 IP 地址。
6. 全局负载均衡设备把服务器的 IP 地址返回给用户。
7. 用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用户终端。如果这台缓存服务器上并没有用户想要的内容，而区域均衡设备依然将它分配给了用户，那么这台服务器就要向它的上一级缓存服务器请求内容，直至追溯到网站的源服务器将内容拉到本地。

引申问题，处理 cdn 缓存刷新问题

> [阿里云 cdn 的配置](https://help.aliyun.com/zh/cdn/user-guide/add-a-cache-rule)

## 如何查看DNS缓存

win

```bash
ipconfig /displaydns
ipconfig /flushdns
```

mac

```bash
sudo dscacheutil -cachedump -entries
sudo killall -HUP mDNSResponder
```

## 关于跨域

> [为什么浏览器要限制跨域访问? - 知乎](https://www.zhihu.com/question/26379635)

## preload 和 prefetch 了解么

> [一站式理解 - prefetch preconnect prerender preload](https://www.jianshu.com/p/4a5f50addccb)

## http 状态码 301 和 302 了解么

- **http 状态码 301**： 永久重定向，意为旧的 URL 已经不在使用，已永久转移至新的地址。

- **http 状态码 302**： 临时重定向，意为某个时间段因为某些原因临时进行的跳转行为，旧的 URL 地址依然使用并存在。

**网站什么时候使用 301 重定向?**

1、网站进行了改版，新的 URL 结构和旧的 URL 结构不一致，此时，需要讲所有旧网站的 URL 全部 301 到新的网站上，并且要保持 URL 的一一对应，万不可全部跳转至首页，或跳转对应错误。

2、不带 www 的主域名跳转至到 www 的网址版本，如：http://googlenb.com 301 至 http://www.googlenb.com 。 需注意的是，此时跳转也需全站跳转，不要只做首页跳转。

3、http 模式跳转至 https 模式，如：http://www.googlenb.com 301 至 https://www.googlenb.com ，如果网站启用 https，该规则是必须存在的，此规则如果存在，需特别注意不要和上述第二条跳转规则重复跳转，避免 301 两次或多次跳转。即应该： http://googlenb.com 、 http://www.googlenb.com 、 https://googlenb.com , 一次性统一跳转至：https://www.googlenb.com

4、内容重复，内容合并等跳转，同一篇内容存在多个 URL 都能到达访问，此时需要设置跳转至标准且唯一的 URL 版本，避免网站权重分散。

**网站什么时候使用 302 重定向？**

1、移动端访问 PC 端的网站，或 PC 端访问移动端网站，此时建议使用 302 跳转，如移动端访问http://www.163.com， 302 至 http://3g.163.com。

2、临时活动或临时跳转，在举行重大活动，需对活动进行宣传，如：用户访问首页或某些页面时时临时跳转至活动专页，待活动结束后取消跳转。

## LocalStorage、Cookie 等区别？

> [细说 localStorage, sessionStorage, Cookie, Session - 掘金](https://juejin.cn/post/6844903587764502536)

## 什么是 DOM 和 BOM？

- DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。
- BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM 的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局） 对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 locati on 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对 象的子对象。

## 介绍下浏览器缓存

**强缓存(不要向服务器询问的缓存) 返回状态码 200**

- 设置 Expires

即过期时间，例如「Expires: Thu, 26 Dec 2019 10:30:42 GMT」表示缓存会在这个时间后失效，这个过期日期是绝对日期，如果修改了本地日期，或者本地日期与服务器日期不一致，那么将导致缓存过期时间错误。

- 设置 Cache-Control

HTTP/1.1 新增字段，Cache-Control 可以通过 max-age 字段来设置过期时间，例如「Cache-Control:max-age=3600」除此之外 Cache-Control 还能设置 private/no-cache 等多种字段

**协商缓存(需要向服务器询问缓存是否已经过期)返回状态码 304**

- Last-Modified

即最后修改时间，浏览器第一次请求资源时，服务器会在响应头上加上 Last-Modified ，当浏览器再次请求该资源时，浏览器会在请求头中带上 If-Modified-Since 字段，字段的值就是之前服务器返回的最后修改时间，服务器对比这两个时间，若相同则返回 304，否则返回新资源，并更新 Last-Modified

- ETag

HTTP/1.1 新增字段，表示文件唯一标识，只要文件内容改动，ETag 就会重新计算。缓存流程和 Last-Modified 一样：服务器发送 ETag 字段 -> 浏览器再次请求时发送 If-None-Match -> 如果 ETag 值不匹配，说明文件已经改变，返回新资源并更新 ETag，若匹配则返回 304

**两者对比**

- 当浏览器再次访问一个已经访问过的资源时，它会这样做：

  1.看看是否命中强缓存，如果命中，就直接使用缓存了。 2.如果没有命中强缓存，就发请求到服务器检查是否命中协商缓存。 3.如果命中协商缓存，服务器会返回 304 告诉浏览器使用本地缓存。 4.否则，返回最新的资源。

- ETag 比 Last-Modified 更准确：如果我们打开文件但并没有修改，Last-Modified 也会改变，并且 Last-  Modified 的单位时间为一秒，如果一秒内修改完了文件，那么还是会命中缓存如果什么缓存策略都没有设置，那么浏览器会取响应头中的 Date 减去 Last-Modified 值的 10% 作为缓存时间

## 输入 url 到页面渲染发生了什么？⭐️

多结合网上知识整合，下面是一个简述

1. 域名解析（DNS），拿到目标服务器的 IP 地址；
2. 建立连接（TCP + TLS），若是 HTTPS，还需进行 TLS 握手（对称加密 + 非对称加密 + 证书校验）；
3. 服务端处理请求，返回 HTML 页面；
4. 浏览器解析 HTML，构建 DOM 树；
5. 浏览器解析 CSS，构建 CSSOM 树（css 解析优先度高，会阻塞 js 执行，但不会阻塞 DOM 构建，JS 会阻塞 DOM 构建，所以一般放到最后或者异步使用）；
6. 浏览器将 DOM + CSSOM 合并生成 Render Tree（不包含 display: none 的节点）；
7. 浏览器根据 Render Tree 计算每个节点的几何信息（位置、大小），将每个节点绘制到屏幕（Paint）；
8. 如果有复杂图层，会进入合成（Compositing）阶段，如使用了 transform、position: fixed 等

描述并不是很明确

> [【干货】浏览器是如何运作的？\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1x54y1B7RE)

描述较为准确

> [浏览器渲染简述](https://segmentfault.com/a/1190000014733203)

国外引文

> [Constructing the Object Model](https://web.dev/critical-rendering-path-constructing-the-object-model/)

引申问题： css 加载会导致阻塞页面白屏么

> [css 加载会造成阻塞吗？ - 陈陈 jg - 博客园](https://www.cnblogs.com/chenjg/p/7126822.html)

## TCP 三次握手四次挥手

三次握手：

1. 客户端发送 SYN 包（带有初始序列号）给服务器。
2. 服务器收到 SYN 包并回复 SYN-ACK 包（包含服务器的序列号和客户端的序列号+1）。
3. 客户端收到 SYN-ACK 包，回复 ACK 包（包含服务器的序列号+1）。

四次挥手：

1. 客户端发送 FIN 包，表示要关闭连接。
2. 服务器收到 FIN 包并回复 ACK 包，表示收到请求。
3. 服务器发送 FIN 包，表示也要关闭连接。
4. 客户端收到 FIN 包并回复 ACK 包，表示确认关闭连接，进入 2MSL 等待状态，等待状态结束后完全关闭连接。

> [面试官，不要再问我三次握手和四次挥手](https://segmentfault.com/a/1190000020610336)

## http 请求 get 和 post 的区别?

- GET 在浏览器回退时是无害的，而 POST 会再次提交请求。

- GET 产生的 URL 地址可以被 Bookmark，而 POST 不可以。

- GET 请求会被浏览器主动 cache，而 POST 不会，除非手动设置。

- GET 请求只能进行 url 编码，而 POST 支持多种编码方式。

- GET 请求参数会被完整保留在浏览器历史记录里，而 POST 中的参数不会被保留。

- GET 请求在 URL 中传送的参数是有长度限制的，而 POST 么有。

- 对参数的数据类型，GET 只接受 ASCII 字符，而 POST 没有限制。

- GET 比 POST 更不安全，因为参数直接暴露在 URL 上，所以不能用来传递敏感信息。

- GET 参数通过 URL 传递，POST 放在 Request body 中。

- GET 产生一个 TCP 数据包，POST 产生两个 TCP 数据包。对于 GET 方式的请求，浏览器会把 http header 和 data 一并发送出去，服务器响应 200（返回数据），而对于 POST，浏览器先发送 header，服务器响应 100 continue，浏览器再发送 data，服务器响应 200 ok（返回数据）。

> [get 和 post 请求有哪些区别？ - 踏步 - 博客园](https://www.cnblogs.com/mjtabu/p/12090419.html)

<!-- ## m3u8，flv，mp4 等视频协议与区别？

问的比较少 -->

## socket 与 websocket 是什么？

- socket 翻译为套接字，socket 是在应用层和传输层之间的一个抽象层，它把 TCP/IP 层复杂的操作抽象为几个简单的接口供应用层调用以实现进程在网络中通信。
- WebSocket 协议是基于 TCP 的一种新的网络协议，和 http 协议一样属于应用层协议，是一种让客户端和服务器之间能进行双向实时通信的技术。

有点类似 tcp/ip 与 http，但是 socket 在传输层之上更加进一步封装了，这里可以联想到 webpack 的热更新

## http2.0 与 http1.1 的区别？

http2.0 的几大特性

1. 二进制分帧

HTTP/2 没有改动 HTTP 的应用语义，仍然使用 HTTP 的请求方法、状态码和头字段等规则，它主要修改了 HTTP 的报文传输格式。HTTP/1.1 协议以换行符作为纯文本的分隔符，而 HTTP/2 将所有传输的信息分割为更小的消息和帧，并采用二进制格式对它们编码，这些帧对应着特定数据流中的消息，他们都在一个 TCP 连接内复用。

2. 头部压缩

HTTP 每次请求或响应都会携带首部信息用于描述资源属性。HTTP/1.1 使用文本的形式传输消息头，消息头中携带 cookie 每次都需要重复传输几百到几千的字节，这十分占用资源。HTTP/2 使用了 HPACK 算法来压缩头字段，这种压缩格式对传输的头字段进行编码，减少了头字段的大小。同时，在两端维护了索引表，用于记录出现过的头字段，后面在传输过程中就可以传输已经记录过的头字段的索引号，对端收到数据后就可以通过索引号找到对应的值。

3. 多路复用

多路复用允许同时通过单一的 HTTP/2 连接发起多重的请求-响应消息，实现多流并行而并不依赖多个 TCP 连接，HTTP/2 把 HTTP 协议通信的基本单位缩小为一个一个的帧，这些帧对应着逻辑流中的消息，并行地在同一个 TCP 连接上双向交换消息。HTTP/2 基于二进制分帧层，HTTP/2 可以在共享 TCP 连接的基础上同时发送请求和响应。HTTP 消息被分解为独立的帧，而不破坏消息本身的语义交错发出去，在另一端根据流标识符和首部将他们重新组装起来。通过多路复用技术，可以避免 HTTP 旧版本的消息头阻塞问题，极大提高传输性能。

4. 服务器推送

HTTP2.0 的一个强大的新功能，就是服务器可以对一个客户端请求发送多个响应。服务器向客户端推送资源无需客户端明确的请求。服务端根据客户端的请求，提前返回多个响应，推送额外的资源给客户端。如果一个请求是由你的主页发送的，服务器可能会响应主页内容、logo 以及样式表，因为服务端知道客户端会用到这些东西。这样不但减轻了数据传送冗余步骤，也加快了页面响应的速度，提高了用户体验。

> [一文读懂 HTTP/2 特性](https://zhuanlan.zhihu.com/p/26559480)

## tcp 和 udp 区别和适用场景？

面向连接和无连接的 问的不多

## https 协议跟 http 有什么区别

可以简述 https 协议认证过程

> [我是这样理解 HTTP 和 HTTPS 区别的 - Jesse131 - 博客园](https://www.cnblogs.com/jesse131/p/9080925.html)

## xss，csrf 等网络安全问题

> [如何用简洁生动的语言说明 XSS 和 CSRF 的区别？ - 知乎](https://www.zhihu.com/question/34445731)

## 什么是 token 鉴权？

可以引申了解一下单点登录

> [单点登录（SSO）看这一篇就够了](https://developer.aliyun.com/article/636281)

> [基于 token 的登陆验证机制 - 程序员自由之路 - 博客园](https://www.cnblogs.com/54chensongxia/p/13491214.html) >[微信链接](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651580141&idx=1&sn=418b943b6765e6ea790cc65764153645&chksm=8025312cb752b83a78dfd28754f567dab743b7b9098055f5819cd440dc39a96b999fcaf3c325&mpshare=1&scene=1&srcid=0905SZ6TYNzqMBA9OuN4OWGb&sharer_sharetime=1630842381432&sharer_shareid=78202e0bfa0a107bbf1a59f370aafdfb&key=553a45c3e4e7e5ae2ef2b15ba4d4fac96a06ba71c75764cf5993da3cfe1234df0cc00dcd47ca9e366bb3980e1456ec0cf10c4d91f0942745c1741afb5e9142c96069f1daf67b1251033b9d8a466e442832f2b5e239c1f9332de449453af6a30d98a1457bd8bb704200226299fa53e916ef1add8bd48ab301d92c1fc349bbf7e2&ascene=1&uin=MjM4NjkxODkwOQ%3D%3D&devicetype=Windows+10&version=62080079&lang=zh_CN&exportkey=A2P1fIDYCZtZKygIyhpmyyU%3D&pass_ticket=uMmLu94W0HjFyvsKEPNN%2BQKBeMR7c%2FFcPmxmoPOG9FyvVFq6EK6EuDcyPlXgXpay&wx_header=0)
