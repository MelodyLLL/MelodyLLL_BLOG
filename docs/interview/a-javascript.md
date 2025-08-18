---
tag: 面试
---

# Javascript 语言基础

<img src="/images/javascript.gif" style="zoom:55%;display:block;margin:0 auto"/>

## 作用域是什么？

最简单的回答是 `全局作用域` 和 `局部作用域`，但是这样面试官可能觉得你理解的不够深刻和全面。

JavaScript 的作用域分为以下几种：

1. 全局作用域（Global Scope）：全局作用域是最外层的作用域，它在整个代码中都可访问。在浏览器环境中，全局作用域通常是指 `window` 对象的属性。

2. 函数作用域（Function Scope）：函数作用域是在函数内部声明的变量的作用域。函数内部的变量在函数执行过程中可见，但在函数外部不可访问。

3. 块级作用域（Block Scope）：块级作用域是由花括号 `{}` 所定义的代码块内部的作用域。在 ES6 之前，JavaScript 中没有块级作用域，只有全局作用域和函数作用域。但在 ES6 中引入了 `let` 和 `const` 关键字，可以在块级作用域中声明变量。

4. 模块作用域（Module Scope）：模块作用域是 ES6 模块化引入的概念，每个模块都有自己的作用域，模块内部的变量对外部是不可见的，除非明确地导出和导入。

作用域决定了变量和函数的可见性和访问范围。变量的作用域可以是全局范围、函数内部范围或块级范围，而模块作用域是在模块级别上划分的。了解作用域的概念可以帮助我们正确地管理变量和避免命名冲突。

## 作用域链

一般情况下，变量取值到创建这个变量的函数的作用域中取值。但是如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链。

## 闭包的概念和作用

1. 我的理解：**全局作用域外**的函数访问上层作用域的变量就形成了闭包。此函数称作闭包函数，变量称为闭包。**(更加准确的说法：闭包是指一个函数能够访问其词法作用域（定义时作用域）中的变量，即使这个函数是在其作用域之外被调用的。)**

2. 官方理解：闭包（closure）是一个函数以及其捆绑的周边环境状态（lexical environment，词法环境）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。
   简述：闭包是由函数以及声明该函数的词法环境组合而成的

官方理解中，可能比较难理解的是 `词法作用域`
它是什么？ 词法作用域（Lexical Scope） 是定义表达式并能被访问的区间。一个声明（定义变量、函数等）的词法作用域就是它被定义时所在的作用域。
因此 `myName` 的词法作用域是全局作用域，而不是被调用的函数作用域。只有词法作用域内的代码才可以访问该作用域内部的代码。

```js
// 定义一个全局作用域变量：
const myName = 'myName';

// 在函数体内调用myName变量
function getName() {
	return myName;
}

console.log(getName()); // 'myName'
```

我一直认为上图中的也算一种闭包，但是当我考虑到闭包的两个特点：
**闭包的第一个作用即可以创建私有变量，这也是模块化的一个基石。第二个作用就是延长变量的生命周期，而似乎这里都不满足** 因此我把我的理解中加上了**全局作用域外**这个修饰。另外关于更加精准的说法可以发现它并不满足最后一段描述：即使这个函数是在其作用域之外被调用的。but,于官方定义来说，似乎上述例子也能算闭包？？🤔

## 解释原型和原型链

1. 每个构造函数都有一个 `prototype` 属性，指向它的原型对象，而且构造函数生成的每个实例也都有一个指向原型对象的内部指针。原型对象上的属性和方法是它所属构造函数生成的实例共享的。
2. 在 JavaScript 中，每个实例对象都有一个私有属性 `[[Prototype]]`，该属性指向了这个实例对象的原型，你可以通过 ES6 的 `Object.getPrototypeOf()` 来访问该属性，许多浏览器也对 `[[Prototype]]` 进行了实现，也就是我们经常见到的 `__proto__`，`__proto__` 指向了实例对象的原型对象。
3. JavaScript 对象（除了 null）在创建的时候就会关联一个对象，这个对象就是原型，每一个对象都会从原型上继承属性，原型也是对象，所以原型也有原型对象，层层往上，直到 `Object.prototype`，这就是原型链。对象都会有一个 `__proto__` 属性来访问自己的原型，同时这个原型就是生成该对象的构造函数的 `prototype` 属性值。每个原型对象都有一个 `constructor` 属性，指向相关联的构造函数。

```javascript
const arr = [];

arr.__proto__ === Array.prototype;

a.__proto__.constructor;
// a.__proto__.constructor打印的值如下👇
// ƒ Array() { [native code] }

Array.prototype.__proto__ === Object.prototype;

Object.prototype.__proto__ === null;
```

## js 基本类型和引用类型区别？

JavaScript 的数据类型分为两类：**基本类型**和**引用类型**。

### 基本类型（Primitive Types）

包括：`String`、`Number`、`Boolean`、`Undefined`、`Null`、`Symbol`、`BigInt`。

- **存储位置**：值直接存储在**栈内存**中。
- **赋值/比较**：赋值时会复制一份新值，比较时比的是值本身。

```js
let a = 1;
let b = a; // b 是 a 的副本
```

### 引用类型（Reference Types）

包括：`Object`（如数组、函数、日期等）。

- **存储位置**：对象本身存储在**堆内存**，变量保存的是指向堆的**引用（地址）**，引用存在栈中。
- **赋值/比较**：赋值时复制引用，多个变量指向同一对象，比较时比的是引用地址。

```js
let obj1 = { name: 'Alice' };
let obj2 = obj1; // obj2 和 obj1 指向同一对象
```

**总结**：

- 基本类型：值存在栈，赋值/比较是值本身。
- 引用类型：对象存在堆，引用存在栈，赋值/比较是引用地址。

```javascript
let obj1 = { name: 'Alice' };
let obj2 = obj1; // 指向同一个对象
obj2.name = 'Bob';
console.log(obj1.name); // 输出 'Bob'
```

基本类型和引用类型在内存中的存储方式和赋值行为不同，这是它们最主要的区别。理解这些区别对于正确处理 JavaScript 中的数据非常重要。

## == 和 === 的区别

- ==（宽松相等）：比较时会进行类型转换（类型强制转换）。
- ===（严格相等）：比较时不会进行类型转换，只有类型和值都相等才返回 true。

## js 的包装类型？

注意：我们不能给基本包装类型添加属性和方法

```js
let s = 'JavaScript';
s.language = 'ECMAScript';
console.log(s.language); // undefined
```

> [Js 基本包装类型（含原理）\_js 包装类型的原理\_scluis 的博客-CSDN 博客](https://blog.csdn.net/weixin_42619772/article/details/122510569)

## 关于 js 中的循环语句

一篇很棒的英文介绍

> [Looping over Arrays: for vs. for-in vs. .forEach() vs. for-of](https://link.zhihu.com/?target=https%3A//2ality.com/2021/01/looping-over-arrays.html)

## set 与 map 是什么？应用场景？

> [ES6 的 Map 和 Object](https://www.runoob.com/w3cnote/es6-map-set.html)

## 为什么会有变量提升

1. 解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间
2. 声明提升还可以提高 JS 代码的容错性，使一些不规范的代码也可以正常执行

## 事件委托与事件冒泡

**事件冒泡：** 当一个事件在 DOM 中触发时，它会沿着 DOM 树向上传播，直到达到根节点。这个过程就叫做事件冒泡。简单来说，如果你点击了一个按钮，那么点击事件不仅会触发在按钮上，还会在按钮的父级、祖父级元素上依次触发。

**事件委托：** 事件委托是利用了事件冒泡的原理。它的基本思想是将事件绑定到父元素上，然后利用事件冒泡的机制，当事件触发时，检查事件的目标，如果目标是子元素，则执行相应的处理函数。通过事件委托，你可以在减少事件监听器数量的同时，实现对动态添加或移除的子元素的事件处理。

## const 声明的值可以修改么？

基本类型不可以，引用类型可以。const 指针指向的地址不可以改变，指向地址的内容是可以改变的。因为 const 只是保证对象的指针不改变，而对象的内容改变不会影响到指针的改变，所以对象的属性内容是可以修改的。

## null 和 undefined 的区别？

#### null 是一个表示”无”的对象，转为数值时为 0

1. null 表示”没有对象”，即该处不应该有值
2. 作为函数的参数，表示该函数的参数不是对象。
3. 作为对象原型链的终点。

#### undefined 表示”缺省值”，就是此处应该有一个值，但是还没有定义,转为数值时为 NaN

1. 变量被声明了，但没有赋值时，就等于 undefined。
2. 调用函数时，应该提供的参数没有提供，该参数等于 undefined。
3. 对象没有赋值的属性，该属性的值为 undefined。
4. 函数没有返回值时，默认返回 undefined。

## JS 的 Event Loop 机制

JavaScript 是单线程的，异步任务的调度依赖于 **事件循环（Event Loop）** 机制。事件循环将任务分为 **宏任务（Macrotask）** 和 **微任务（Microtask）** 两类。有如下重点需要理解：

1. 没有 js 线程的说法，都是在渲染主线程上进行，可以说：主线程包含 JS 引擎执行上下文，与渲染任务（Style/Layout/Paint）互斥运行
2. 宏任务和微任务都有可能依赖其他线程，如网络线程，但是回调一定都是由主线程执行。主线程执行 js 同步任务，遇到宏任务或者微任务放入对应的队列，等待主线程空闲时，执行队列中的任务。
3. 为什么微任务优先级高？这是浏览器定义的标准，类似 Promise 的状态变更（.then()/.catch()）、MutationObserver 的 DOM 变更通知都是属于高优先级，轻量级的异步操作。

### 常见任务类型

- **宏任务（Macrotask）**：  
  `setTimeout`、`setInterval`、`setImmediate`、I/O 操作、UI 渲染等。

- **微任务（Microtask）**：  
  `Promise.then/catch/finally`、`MutationObserver`、`queueMicrotask` 等。

### 示例代码

```js
console.log('start');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve()
	.then(() => console.log('microtask1'))
	.then(() => console.log('microtask2'));

console.log('end');
```

**输出顺序：**

```
start
end
microtask1
microtask2
timeout
```

> 更多参考：[2 分钟了解 JavaScript Event Loop | 面试必备\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1kf4y1U7Ln?from=search&seid=17290685586591017592)

## js 创建对象的几种方式

JavaScript 中创建对象的方式有多种，以下是常见的几种方式：

1. **对象字面量**：使用对象字面量语法直接创建对象。

```javascript
var obj = { key1: value1, key2: value2 };
```

2. **使用构造函数**：通过构造函数创建对象，可以使用 `new` 关键字来实例化一个对象。

```javascript
function Person(name, age) {
	this.name = name;
	this.age = age;
}

var person = new Person('John', 30);
```

3. **使用 Object 构造函数**：使用 `Object` 构造函数创建对象。

```javascript
var obj = new Object();
obj.key1 = value1;
obj.key2 = value2;
```

4. **使用原型链创建对象**：通过原型链的方式创建对象。

```javascript
function Parent() {}
Parent.prototype.method = function () {};

function Child() {}
Child.prototype = new Parent();

var child = new Child();
```

5. **使用 Object.create() 方法**：使用 `Object.create()` 方法创建一个新对象，可以指定新对象的原型。

```javascript
var obj = Object.create(proto);
```

6. **使用工厂模式**：使用工厂模式创建对象，工厂函数负责创建对象并返回。

```javascript
function createPerson(name, age) {
	var person = {};
	person.name = name;
	person.age = age;
	return person;
}

var person = createPerson('John', 30);
```

这些是 JavaScript 中常见的创建对象的方式，每种方式都有其特点和适用场景，开发者可以根据需求选择合适的方式来创建对象。

## new 关键字做了啥

```js
//1、创建一个空的对象
let obj = {}; // let obj = Object.create({});
//2、将空对象的原型prototype指向构造函数的原型
Object.setPrototypeOf(obj, Con.prototype); // obj.__proto__ = Con.prototype
//3、改变构造函数的上下文（this）,并将剩余的参数传入
let result = Con.apply(obj, args);
//4、在构造函数有返回值的情况进行判断
return result instanceof Object ? result : obj;
```

## this 的几种情况描述

1. 在浏览器里，在全局范围内 this 指向 window 对象；
2. 对象方法调用中，this 指向最后调用他的那个对象；
3. 构造函数中，this 指向 new 出来的那个新的对象；
4. call、apply、bind 中的 this 被强绑定在指定的那个对象上；
5. 箭头函数中 this 比较特殊,箭头函数 this 为父作用域的 this，不是调用时的 this.要知道前四种方式,都是调用时确定,也就是动态的,而箭头函数的 this 指向是静态的,声明的时候就确定了下来；

## IIFE 用过么?

全称为：`立即调用函数表达式(Immediately Invoked Function Expressions)`，该方法常用于避免污染全局的命名空间，因为所以在 IIFE 中使用的变量外部都无法访问。

```js
(function () {
	// …
})();

(() => {
	// …
})();

(async () => {
	// …
})();
```

## 解释一下什么是 promise？

1. **Promise 的概念：** Promise 是 ES6 中新增的一种用于处理异步操作的对象。它代表了一个异步操作的最终完成或失败，并且可以获取异步操作的结果。

2. **Promise 的状态：** Promise 有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。当一个 Promise 被创建时，它处于 pending 状态；当异步操作成功完成时，Promise 的状态会变为 fulfilled，并且会调用 `resolve` 方法；当异步操作失败时，Promise 的状态会变为 rejected，并且会调用 `reject` 方法。

3. **Promise 的基本语法：** Promise 的基本语法是使用 `new Promise()` 来创建一个 Promise 对象，它接受一个带有 `resolve` 和 `reject` 两个参数的执行器函数。执行器函数会立即执行，并且通常包含异步操作。示例：

   ```javascript
   let promise = new Promise((resolve, reject) => {
   	// 异步操作
   	setTimeout(() => {
   		resolve('成功'); // 成功时调用 resolve 方法
   		// 或者 reject('失败'); // 失败时调用 reject 方法
   	}, 1000);
   });
   ```

4. **Promise 的链式调用（Promise chaining）：** Promise 提供了 `then()` 方法来处理异步操作的结果。通过链式调用 `then()` 方法，可以依次处理多个异步操作的结果。示例：

   ```javascript
   promise.then(
   	(result) => {
   		console.log('成功：', result);
   	},
   	(error) => {
   		console.log('失败：', error);
   	}
   );
   ```

5. **Promise 的错误处理：** 可以使用 `catch()` 方法来处理 Promise 链中的任何错误。`catch()` 方法接收一个回调函数，用于处理 Promise 链中的错误。示例：

   ```javascript
   promise
   	.then((result) => {
   		console.log('成功：', result);
   	})
   	.catch((error) => {
   		console.log('失败：', error);
   	});
   ```

6. **Promise 的其他方法：** 除了 `then()` 和 `catch()` 方法外，Promise 还提供了其他一些方法，如 `finally()`、`all()`、`race()` 等，用于处理多个 Promise 实例的情况。

7. **示例代码：** 在讲解时最好给出一些示例代码，以便面试官更好地理解你的解释。可以通过简单的示例演示 Promise 的创建、状态转换、链式调用等操作。

## Async 函数实现原理

看看阮一峰翻译的教程

> [ES6 入门教程](https://es6.ruanyifeng.com/#docs/async)

## JS 垃圾回收

问的概率不大（但真的有公司会问！）与内存泄漏一起问

> [JavaScript 的内存是怎么进行管理的](https://noneed.me/subject/6606bd466fbfbad8b62f9e90?typeId=0&levelId=0)

## setTimeOut 与 setInterval 的区别？

`setTimeout` 和 `setInterval` 都是 JavaScript 中用于执行异步操作的定时器函数，但它们有一些区别：

1. **执行方式**：

`setTimeout`：用于在指定的时间间隔后执行一次指定的函数。

`setInterval`：用于每隔指定的时间间隔重复执行指定的函数。

2. **调用方式**：

`setTimeout` 接受两个参数：要执行的函数和延迟的时间（以毫秒为单位）。

`setInterval` 接受两个参数：要执行的函数和时间间隔（以毫秒为单位）。

3. **执行次数**：

`setTimeout` 只会执行一次指定的函数。

`setInterval` 会重复执行指定的函数，直到被清除（通过 `clearInterval` 函数）或者页面被卸载。

4. **可能存在的性能问题**：

`setInterval` 会按照指定的时间间隔重复执行函数，如果函数的执行时间超过了指定的时间间隔，可能会导致函数多次同时执行，产生性能问题。

`setTimeout` 则不会存在这个问题，因为它只会执行一次函数。

总的来说，`setTimeout` 用于延迟执行一次指定的函数，而 `setInterval` 用于每隔一定时间间隔重复执行指定的函数。在使用时需要根据实际需求选择合适的函数。

请注意，所有的调度方法都不能保证确切的延时。

## 箭头函数和普通函数的区别

1. 写法更简洁
2. 箭头函数没有 this，它的 this 继承于作用域链，因此箭头函数没有自己的 arguments，不能作为构造函数。也没有原型 prototype（这个可以自己试验下）

## 柯里化是什么

柯里化（英语：Currying），又称为部分求值，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回一个新的函数的技术，新函数接受余下参数并返回运算结果。

知乎看到一个挺好的示例

```js
var append = function (parent, child) {
	parent.appendChild(child);
};
var remove = function (dom) {
	dom.remove();
};
append(parent, child); //插入
remove(child); //删除
```

柯里化后

```js
var append = function (parent, child) {
	parent.appendChild(child);
	return function () {
		child.remove();
	};
};
//或者是这种，point free风格
var append2 = function (parent, child) {
	parent.appendChild(child);
	return child.remove.bind(child);
};

var remove = append(parent, child); //插入一个节点，同时返回所插入的节点的删除操作。
remove(); //删除。
```

## 深拷贝浅拷贝的区别

- 浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以**如果其中一个对象改变了这个地址，就会影响到另一个对象**。
- 深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且**修改新对象不会影响原对象**。

## ES6 常用语法和 api

问的挺多，一般回答自己常用的就行

> [ES6 入门教程](https://es6.ruanyifeng.com/)

## typeof 和 instanceOf

typeof 一般只能返回如下几个结果：

- 'undefined' ：这个值未定义。
- 'boolean'：这个值是布尔值。
- 'string' ：这个值是字符串。
- 'number' ：这个值是数值。
- 'object'：这个值是对象或 null。
- 'function' ：这个值是函数。

而 instanceOf 会沿着原型链去找其对应构造函数的类型

## 什么是 AST

AST 全名 abstract syntax tree(抽象语法树),抽象表示把 js 代码进行了结构化的转化,转化为一种类似树状数据结构的 json 对象。 js 是一种解释性语言,js 引擎将 js 代码交给解释器之前,要先进行格式化,也就是通过词法和语法分析后构建出抽象语法树(AST),之后会交给解释器,最终解释称计算机可以识别的机器码。

## JS 监听 dom 变化

用 MutationObserver

> [如何监听 DOM 变化](https://juejin.cn/post/6844904000467255303)

## Promise.all 如何防止一个 promise 失败使整个 promise 失败

第一种是直接使用 api allsettled

第二种用 Promsie 先包装一次

> [怎么避免 Promise.all 其中一个 reject 让所有都取不到值\_landiyaaa 的博客-CSDN 博客](https://blog.csdn.net/landiyaaa/article/details/113633033)

## 暂存性死区

JavaScript 中的 "暂存性死区"（Temporal Dead Zone，简称 TDZ）是指在块级作用域内使用 `let` 或 `const` 声明的变量，该变量在声明之前被访问时会触发一个 ReferenceError。这种行为是由于 JavaScript 引擎在块级作用域中使用了词法环境（Lexical Environment）和变量提升（Hoisting）的机制。

暂存性死区的产生原因如下：

1. **块级作用域**：使用 `let` 或 `const` 声明的变量具有块级作用域，即只在声明它的块中有效。

2. **变量提升**：虽然 `let` 和 `const` 声明的变量不会像 `var` 那样被提升至当前作用域的顶部，但它们会被提升至当前块级作用域的顶部。在这个过程中，变量存在于块级作用域中，但是处于未初始化的状态。

3. **暂存性死区**：在变量被声明之前的区域称为暂存性死区，如果在暂存性死区内访问该变量，就会触发 ReferenceError。

举两个 🌰：

```javascript
console.log(myVar); // ReferenceError: Cannot access 'myVar' before initialization
let myVar = 42;
```

在这个例子中，`console.log(myVar)` 在变量 `myVar` 的声明之前被调用，因此触发了暂存性死区，导致 ReferenceError。

```javascript
if (true) {
	let a = 1;
	var b = 2;
}
```

这个例子中， a is not defined，b 打印为 2，因此，为了避免暂存性死区，应该在使用 `let` 或 `const` 声明的变量之前进行声明和初始化。
