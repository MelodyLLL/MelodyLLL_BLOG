# HTML 和 CSS

## 标签语义化

**什么是 HTML 语义化标签？**

语义化标签，就是让标签有自己的含义，利用本身传达它所包含内容的一些信息，使浏览器和搜索引擎直观的认识标签和属性的用途和作用。过去我们常常采用 DIV+CSS 的方式布局页面，但 DIV 标签本身没有独特的含义，这样做的结果就是文档结构不够清晰，不利于浏览器对页面的读取，在分离 CSS 样式后，用户体验不友好。所以
HTML5 新增了很多语义化标签，使文档更具可读性，页面结构更清晰。

**为什么要用 H5 语义化标签？**

代码结构清晰，可读性高，减少差异化，便于团队开发和维护。在页面没有加载 CSS 的情况下，也能呈现良好的内容结构，提升用户体验。对搜索引擎友好，良好的结构和语义，有助于爬虫抓取更多的有效信息。

**HTML5 语义化标签有哪些？**

- header 标签： 页眉，通常包括网站标志、主导航、全站链接以及搜索框
- article 标签：用来定义独立于文档且有意义的来自外部的内容
- section 标签：定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。
- aside 标签：定义 article 标签外的内容，可用作文章的侧边栏
- footer 标签：页脚，只有当父级是 body 时，才是整个页面的页脚。

**好处是什么？**

- HTML 结构清晰;
- 代码可读性较好;
- 无障碍阅读;
- 搜索引擎可以根据标签的语言确定上下文和权重问题;
- 移动设备能够更完美的展现网页（对 css 支持较弱的设备）;
- 便于团队维护和开发

## css 嵌套和标签嵌套过多的坏处

开放性问题，可以答结构不清晰，影响 dom 解析速度等，发散一下这里可以考虑到 cssom tree 和 dom tree 的解析和渲染顺序。

## display、visibility 和 opacity 的区别

#### **共同点：**

都可以隐藏元素，让元素不可见

#### **区别：**

**display: none**

- DOM 结构：浏览器不会渲染 display 属性为 none 的元素，不占据空间；
- 事件监听：无法进行 DOM 事件监听；
- 性能：动态改变此属性时会引起重排，性能较差；
- 继承：不会被子元素继承，毕竟子类也不会被渲染；
- transition：transition 不支持 display。

**visibility: hidden**

- DOM 结构：元素被隐藏，但是会被渲染不会消失，占据空间；
- 事件监听：无法进行 DOM 事件监听；
- 性 能：动态改变此属性时会引起重绘，性能较高；
- 继 承：会被子元素继承，子元素可以通过设置 visibility: visible; 来取消隐藏；
- transition：transition 支持 visibility。

**opacity: 0**

- DOM 结构：透明度为 100%，元素隐藏，占据空间；
- 事件监听：可以进行 DOM 事件监听；
- 性 能：提升为合成层，不会触发重绘，性能较高；
- 继 承：会被子元素继承,且，子元素并不能通过 opacity: 1 来取消隐藏；
- transition：transition 支持 opacity。

## 图片引用方式 background-image 和 img 的区别

- 是否占位

background-image 是背景图片，是 css 的一个样式，不占位；
\<img />是一个块状元素，它是一个图片，是 html 的一个标签，占位；

- 是否可操作

（1）background-image 是只能看的，只能设置如下属性：
background-position: 为每一个背景图片设置初始位置。 这个位置是相对于由 background-origin 定义的位置图层；
background-attachment: 决定背景是在视口中固定的还是随包含它的区块滚动的；
background-repeat: CSS 属性定义背景图像的重复方式。背景图像可以沿着水平轴，垂直轴，两个轴重复，或者根本不重复。

（2）\<img />是一个 document 对象，它是可以操作的。比如更换 img src 的路径可以达到更换图片的目的，也可以移动它的位置，从 document 中移除等等操作。
所以如果是装饰性的图片就使用 background-img，如果和文体内容很相关就使用 img。

- 加载顺序不同

在网页加载的过程中，以 css 背景图存在的图片 background-image 会等到结构加载完成（网页的内容全部显示以后）才开始加载，而 html 中的标签 img 是网页结构（内容）的一部分会在加载结构的过程中加载，换句话讲，网页会先加载标签 img 的内容，再加载背景图片 background-image，如果你用引入了一个很大的图片，那么在这个图片下载完成之前，img 后的内容都不会显示。而如果用 css 来引入同样的图片，网页结构和内容加载完成之后，才开始加载背景图片，不会影响你浏览网页内容。

## 如何实现一个未知宽高元素的水平垂直居中？

```css
// 1 绝对定位
.parent {
	width: 100%;
	height: 400px;
	background: #666;
	position: relative;
}
.children {
	position: absolute;
	top: 50%;
	left: 50%;
	background: red;
	transform: translate(-50%, -50%);
}

// 2 flex 布局
// 3 grid 布局

align-items: center;
justify-content: center;
```

## 父容器中固定宽度的元素，设置另一个元素填满剩余宽度

可利用下一题的 BFC 原理

> [实现左边 div 固定宽度，右边 div 自适应撑满剩下的宽度的布局方式： - FEDeveloper - 博客园](https://www.cnblogs.com/yzhihao/p/6513022.html)

## 什么是 BFC,有什么作用

BFC 是块级格式化上下文（Block Formatting Context）的缩写，它是 CSS 中一个重要的概念，用于描述在页面中块级盒子布局发生的区域。BFC 决定了盒子如何排列以及与其他元素的关系，它对于处理布局、浮动、清除浮动和外边距折叠等方面都有着重要作用。

BFC 具有以下特性：

1. **内部的块级盒子会在垂直方向上一个接一个地放置**，默认情况下不会重叠。
2. **盒子在垂直方向上的边距会发生折叠**，但是在 BFC 中的元素的边距不会与其子元素的边距发生折叠。
3. **BFC 区域不会与浮动元素重叠**，即 BFC 区域会包含浮动元素，不会被浮动元素覆盖。
4. **BFC 区域内部的元素会自动清除浮动**，不会影响到浮动元素。

触发 BFC 的条件包括：

- 根元素（`<html>`）。
- 浮动元素（`float` 不为 `none`）。
- 绝对定位元素（`position` 为 `absolute` 或 `fixed`）。
- 行内块元素（`display` 为 `inline-block`）。
- 表格单元格（`display` 为 `table-cell`）。
- 弹性盒子（`display` 为 `flex` 或 `inline-flex`）。
- `overflow` 不为 `visible` 的元素。

通过创建 BFC，可以解决一些常见的布局问题，如清除浮动、防止外边距折叠等。在实际开发中，合理地利用 BFC 可以使页面布局更加稳定和可靠。

> [带你用最简单的方式理解最全面的 BFC\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1aZ4y1M7gW/?spm_id_from=333.788.recommend_more_video.6)

## 标准盒模型和怪异盒模型

标准盒模型与怪异(IE)盒模型的区别在于计算盒子的宽高是不一样的

怪异盒模型：width = content + padding + border、height = content + padding + border

标准盒模型： width = content、height = content

设置怪异盒模型： box-sizing: border-box;

设置标准盒模型： box-sizing: content-box;

规定从父元素继承 box-sizing：inhert;

## 如果要实现一个点击之后从左边平移到右边的过渡动画我可以怎么做

- css3 动画（不会重排）

- js 原生

## flex 有哪些相关的属性，以及其作用

参考阮一峰老师的这个即可

> [https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## SVG 和 canvas 的区别

CSS3 中的 `translate()` 函数可以实现元素的平移，它不会导致页面重排的主要原因是它在 GPU 层面进行处理，而不是在 CPU 层面进行计算和重排。

具体来说，`translate()` 函数是在 GPU 中执行的硬件加速操作，它会将元素的渲染过程交给 GPU 处理，而不会触发浏览器的重排和重绘。这样一来，元素的平移操作可以更加流畅，而且不会影响其他元素的布局和渲染，从而提高了页面的性能和用户体验。

相比之下，如果使用传统的方法（如修改元素的 `left` 或 `top` 属性），会触发浏览器的重排和重绘，因为这些操作需要浏览器重新计算元素的布局和样式，然后更新渲染树和页面内容。

因此，使用 `translate()` 函数来实现元素的平移可以更加高效地进行动画和交互效果的实现，并且能够提升页面的性能表现。

> [https://www.w3school.com.cn/html/html5_canvas_vs_svg.asp](https://www.w3school.com.cn/html/html5_canvas_vs_svg.asp)

## 重排和重绘

当 DOM 的变化引发了元素几何属性的变化，比如改变元素的宽高，元素的位置，导致浏览器不得不重新计算元素的几何属性，并重新构建渲染树，这个过程称为“重排”。完成重排后，要将重新构建的渲染树渲染到屏幕上，这个过程就是“重绘”。
简单的说，重排负责元素的几何属性更新，重绘负责元素的样式更新。而且，重排必然带来重绘，但是重绘未必带来重排。比如，改变某个元素的背景，这个就不涉及元素的几何属性，所以只发生重绘。

## 为什么 css3 translate 不会导致重排

CSS3 中的 `translate()` 函数可以实现元素的平移，它不会导致页面重排的主要原因是它在 GPU 层面进行处理，而不是在 CPU 层面进行计算和重排。

具体来说，`translate()` 函数是在 GPU 中执行的硬件加速操作，它会将元素的渲染过程交给 GPU 处理，而不会触发浏览器的重排和重绘。这样一来，元素的平移操作可以更加流畅，而且不会影响其他元素的布局和渲染，从而提高了页面的性能和用户体验。

相比之下，如果使用传统的方法（如修改元素的 `left` 或 `top` 属性），会触发浏览器的重排和重绘，因为这些操作需要浏览器重新计算元素的布局和样式，然后更新渲染树和页面内容。

因此，使用 `translate()` 函数来实现元素的平移可以更加高效地进行动画和交互效果的实现，并且能够提升页面的性能表现。

## css 选择器语法

<img src="/images/cssselectorcheatsheet.png" style="zoom:55%;display:block;margin:0 auto"/>
