# 自定义eslint插件
## 为什么要写这个插件

- 有助于统一组件、工具类的使用，提升开发效率和提升性能优化
- 强制遵守一些开发规范
- 自定义我们自己的开发规范

## 怎样写这个插件

1. 首先，需要导出一个js文件，需要npm init

2. 然后，进入官网

[Working with Plugins](https://eslint.bootcss.com/docs/developer-guide/working-with-plugins)

   1. 一个方法👉 create，返回一个AST语法树的遍历器，以供eslint收集
   2. 一个参数👉 context，eslint的钩子，类比webpack的、谷歌浏览器的插件开发
   3. 一个对象👉 meta，重点关注messages，docs


**关于Yeoman**
[The web’s scaffolding tool for modern webapps | Yeoman](https://yeoman.io/)

类似的还有
[Plop: Consistency Made Simple](https://plopjs.com/)

3. 需要的命令
```javascript
yo eslint:plugin
yo eslint:rule
```

**关于单元测试**
[Mocha - the fun, simple, flexible JavaScript test framework](https://mochajs.org/)
[测试框架 Mocha 实例教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)

```javascript
// add.test.js
var add = require('./add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
```

eslint中的不一样，更加偏向于对一个结果的测试，而且被eslint封装了
```javascript
const ruleTester = new RuleTester();
ruleTester.run('no-console-melody', rule, {
	valid: [
		// give me some code that won't trigger a warning
		{
			code: 'console.warn(foo)',
			errors: [{ message: 'avoidConsolelog', options: [{ allow: 'info' }] }],
		},
	],

	invalid: [
		{
			code: 'console.log(foo)',
			errors: [{ messageId: 'avoidConsolelog', type: 'MemberExpression' }],
		},
	],
});
```

4. 强烈建议使用的AST在线解析 

设置eslint解析以及eslint v8.0
原理，从头到尾、从尾到头深度遍历AST，该过程中规则对匹配的遍历器进行监听，触发对应回调
[Selectors - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/developer-guide/selectors#what-syntax-can-selectors-have)
[AST explorer](https://astexplorer.net/)
[GitHub - estree/estree: The ESTree Spec](https://github.com/estree/estree)
## 问题

- 仅仅只是为了检测jsx?

[RunKit](https://npm.runkit.com/%40wxml%2Fparser)
[Working with Custom Parsers](https://eslint.bootcss.com/docs/developer-guide/working-with-custom-parsers)


- 规则冲突？
[eslint disable extends in override](https://stackoverflow.com/questions/57107800/eslint-disable-extends-in-override)

- 报错
注意引入自己的eslint插件后，vscode的output有没有报错信息

- 更好的配置方式
```javascript
// eslint-plugin-myPlugin

module.exports = {
    configs: {
        myConfig: {
            plugins: ["myPlugin"],
            env: ["browser"],
            rules: {
                semi: "error",
                "myPlugin/my-rule": "error",
                "eslint-plugin-myPlugin/another-rule": "error"
            }
        },
        myOtherConfig: {
            plugins: ["myPlugin"],
            env: ["node"],
            rules: {
                "myPlugin/my-rule": "off",
                "eslint-plugin-myPlugin/another-rule": "off"
                "eslint-plugin-myPlugin/yet-another-rule": "error"
            }
        }
    }
};
```

## 还可以做的

- eslint强制校验（husky + lint staged）
- 配置更加优化
- 我们的文档
- 自动fix等功能








