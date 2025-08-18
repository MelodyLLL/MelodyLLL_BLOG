# 设计模式

## 发布订阅模式和观察者模式区别

> [观察者模式 vs 发布订阅模式](https://zhuanlan.zhihu.com/p/51357583)

## 单例模式

实现方式可以是使用全局变量和闭包

懒汉式

```js
class Singleton {
	show() {
		console.log('我是单例');
	}
	// 实例变量
	static instance = null;
	// 返回唯一实例的静态方法
	static getInstance() {
		// 判断是否已经new过1个实例
		if (!Singleton.instance) {
			// 如果实例不存在，则先new一个实例
			Singleton.instance = new Singleton();
		}
		// 未来不管执行多少次，都返回这个唯一实例
		return Singleton.instance;
	}
}
const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1);
console.log(s2);
```

饿汉式

```js
class Singleton {
	constructor() {
		// 构造函数中进行初始化工作
		console.log('我是单例');
	}

	show() {
		console.log('显示单例的方法');
	}

	// 饿汉模式在类加载时立即创建实例
	static instance = new Singleton();

	// 返回唯一实例的静态方法
	static getInstance() {
		// 直接返回已经创建的实例
		return Singleton.instance;
	}
}
```

## 工厂模式与策略模式的区别

工厂模式解决"如何创建对象"的问题，策略模式解决"如何执行算法"的问题。在策略模式中，会有一个“上下文”类，可以用来切换不同的策略(js中即不同的方法)

## 关于工厂模式

可能会问到工作中有无使用过，需要知道一些概念，实际上我们最多使用的只是简单工厂。

**简单工厂模式：实际就是在工厂函数中进行不同类的实例化**

```js
// 简单工厂模式示例
class AuthClass {
	constructor(type) {
		this.type = type;
	}
}

// 工厂函数
function createAuth(type) {
	switch (type) {
		case 'wechat':
			return new AuthClass('wechat');
		case 'qq':
			return new AuthClass('qq');
		default:
			return new AuthClass('default');
	}
}

// 使用
const wechatAuth = createAuth('wechat'); // 通过工厂函数创建实例
const qqAuth = createAuth('qq'); // 通过工厂函数创建实例
```

**工厂方法模式：区别于简单工厂模式，工厂方法模式定义了一个创建对象的接口，但由子类决定实例化哪个类。工厂方法将对象的创建延迟到子类。**

> [工厂模式](https://www.cnblogs.com/anding/p/17625778.html)
