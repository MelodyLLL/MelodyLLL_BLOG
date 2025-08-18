<!-- ---
sidebar: auto
--- -->
# 前端基建规范
## 配置eslint
- 安装eslint或者其他相关包（使用框架react,vue等）或者
- 使用npx eslint --init自动生成

创建一个.eslintrc.js文件
```javascript
module.exports = {
  /**
   * 默认情况下，ESLint会在所有父级目录里寻找配置文件，一直到根目录。
   * 为了将ESLint限制在一个特定的项目，设置root: true；
   * ESLint一旦发现配置文件中有 root: true，就会停止在父级目录中寻找。
   */
  root: true,
  // 指定解析器
  // babel-ESLint: 一个对Babel解析器的包装，使其能够与ESLint兼容。
  // parser: 'babel-eslint',
  // 设置解析器能帮助ESLint确定什么是解析错误。
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: "babel-eslint",
    // 指定js版本。语法上的支持
    ecmaVersion: 6,
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  // 脚本在执行期间访问的额外的全局变量
  // globals: {},
  // env: 指定脚本的运行环境
  env: {
    // 一个环境定义了一组预定义的全局变量。
    browser: true,
    // 会自动开启es6语法支持。
    es6: true,
    node: true,
  },
  // 使用第三方插件。全局安装的 ESLint 实例只能使用全局安装的ESLint插件。本地同理，不支持混用。
  plugins: ["html", "vue"],
  // 配置文件从基础配置中继承已启用的规则。
  /**
   * eslint:recommended  启用核心规则，在规则页面中被标记为 √ 的。
   */
  extends: [
    // plugin:(此处不能有空格)包名/配置名称。解析时plugin是解析成 eslint-plugin-vue。如果有空格会解析失败，eslint-plugin- vue。
    // plugin可以省略包名的前缀 eslint-plugin-
    'plugin:vue/essential',
    'eslint:recommended'
  ],

  /**
   * 每个规则有【3】个错误级别。
   * off或0: 关闭该规则；
   * warn或1: 开启规则，使用警告级别的错误，不会导致程序退出；
   * error或2: 开启规则，使用错误级别的错误，当被触发的时候，程序会退出。
   */
  rules: {
    /**
     * 【================================================ Possible Errors ================================================】
     * 这些规则与JavaScript代码中可能的错误或逻辑错误有关。
     */
    // 强制"for"循环中更新子句的计算器朝着正确的方向移动
    "for-direction": 2,
    // 禁止function定义中出现重名参数
    "no-dupe-args": 2,
    // 禁止对象字面量中出现重复的key
    "no-dupe-keys": 2,
    // 禁止出现重复的case标签
    "no-duplicate-case": 2,
    // 禁用 console
    "no-console": 1,
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error': 'off',
    /* // 还可以写表达式，厉害了~
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error': 'off', */
    
    // ......
  },
};
```
如果有需要忽略的文件也可以在 .eslintignore 文件中进行配置:
```javascript
build/*.js
src/assets
public
dist
```

## 配置prettier

- 安装如下依赖 npm i xxx -D
   - **prettier**：prettier插件的核心代码
   - **eslint-plugin-prettier**：将prettier作为ESLint规范来使用
   - **eslint-config-prettier**：解决ESLint中的样式规范和prettier中样式规范的冲突，以prettier的样式规范为准，使ESLint中的样式规范自动失效
   - **prettier-eslint-cli**: 允许你对多个文件用prettier-eslint进行格式化。

- 在项目的根目录下创建.prettierrc.js文件并配置prettier代码检查规则:
```javascript
// .prettierrc.js
module.exports = {
  // 让prettier使用eslint的代码格式进行校验
  eslintIntegration: true,
  // 缩进
  tabWidth: 2,
  // 使用tab还是空格
  useTabs: false,
  // 最大长度80个字符
  printWidth: 200,
  // 行末分号
  semi: false,
  // 单引号
  singleQuote: true,
  // JSX双引号
  jsxSingleQuote: false,
  // 尽可能使用尾随逗号（包括函数参数）
  trailingComma: "none",
  // 在对象文字中打印括号之间的空格。
  bracketSpacing: true,
  // > 标签放在最后一行的末尾，而不是单独放在下一行
  jsxBracketSameLine: false,
  // 箭头圆括号
  arrowParens: "avoid",
  // 在文件顶部插入一个特殊的 @format 标记，指定文件格式需要被格式化。
  insertPragma: false,
  // 行尾换行格式
  endOfLine: "auto",
  HTMLWhitespaceSensitivity: "ignore",
};
```

- 再更新一下eslint的配置，以处理prettier和eslint的冲突。
```javascript
// .eslintrc.js
module.exports = {
  // 其他配置。。。
  extends: [
    //继承 vue 的标准特性
    "plugin:vue/essential",
    "eslint:recommended",
    "prettier",
  ],
  // 其他配置不变。。。
};
```

## 安装husky

- npm i husky --save-dev
- 在package.json 中添加 prepare 脚本
```javascript
{
  ......
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview",
    "prepare": "husky install", // 新增prepare脚本
  }
  ......
}
```

- 执行prepare脚本 npm run prepare，执行 husky install命令时，该命令会创建.husky/目录并指定该目录为git hooks所在的目录。

- 添加git hooks，运行一下命令创建git hooks 
```javascript
npx husky add .husky/pre-commit "npm run lint"
```
运行完该命令后我们会看到.husky/目录下新增了一个名为pre-commit的shell脚本。也就是说在在执行git commit命令时会先执行pre-commit这个脚本。pre-commit脚本内容如下：
```javascript
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
```
该脚本的功能就是执行npm run lint这个命令

- 添加commit-msg脚本, 执行命令
```javascript
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
#or
yarn husky add .husky/commit-msg 'yarn commitlint --edit "$1"'
```

运行完该命令后我们会看到.husky/目录下新增了一个名为commit-msg的shell脚本。commitlint可以对commit massage进行格式规范校验，commit-msg脚本内容如下：
```javascript
#!/bin/sh
"$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
```

## 安装配置lint-staged

- 安装lint-staged

npm i lint-staged --save-dev

- 在 package.json 文件中配置 lint 的命令
```javascript
{
......
"scripts": {
"dev": "vite",
"build": "vite build",
"serve": "vite preview",
"prepare": "husky install", // 新增prepare脚本
"lint": "lint-staged --allow-empty"
}
......
}
```

- 配置lint-staged命令

从 v3.1 开始，可以使用不同的方式进行 lint-staged 配置：

   - 在package.json文件中配置， "src/**/!(*.min).js"表示src目录下所有除了.min.js结尾的.js文件都需要格式化
```javascript
{
  ......
  "lint-staged": {
    "src/**/!(*.min).js": [
      "prettier --write",
      "eslint --fix"
    ],
    "src/**/*.{ts,vue}": [
      "prettier --write",
      "eslint --fix"
    ],
    "src/**/*.{ts,js,vue,html,css,scss,sass,stylus}": [
      "prettier --write"
    ]
  },
  ......
}

```

   - 利用.lintstagedrc文件进行配置，支持JSON或YML格式语法
   - 利用lint-staged.config.js JS格式的文件进行配置
```javascript
"use strict";
module.exports = {
  "{src,server}/**/!(*.min).js": [
    "eslint --fix",
    "prettier --write"
  ],
  "{src,server}/**/*.{ts,vue}": [
    "eslint --fix",
    "prettier --write"
  ],
  "src/**/*.{html,css,scss,sass,stylus}": [
    "prettier --write"
  ]
}
```

   - 使用 --config 或 -c 标志传递配置文件进行配置

## 配置commitlint
最后配置下commitlint，用来定制commit提交规范
commitlint定制提交规范
commitlint是什么： 当我们运行 git commmit -m 'xxx' 时，用来检查 xxx 是否满足固定格式的工具。

为什么使用commitlint：团队中规范了 commit 规范可以更清晰的查看每一次代码提交记录，还可以根据自定义的规则，自动生成 changeLog 文件。

- commitlint安装

npm install --save-dev @commitlint/config-conventional @commitlint/cli

   - @commitlint/cli 是commitlint提供的命令行工具，安装后会将cli脚本放置在./node_modules/.bin/目录下
   - @commitlint/config-conventional 是社区中一些共享的配置，我们可以扩展这些配置，也可以不安装这个包自定义配置

- 定制提交格式

代码提交基本格式为：(scope?): 
type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
scope: 一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
Subject: 一句话描述此次提交的主要内容，做到言简意赅
常用的type类别

| 类型 | 描述 |
| --- | --- |
| ci | 持续集成修改 |
| docs | 文档修改 |
| feat	 | 新特性、新功能 |
| fix | 修改bug |
| perf | 优化相关，比如提升性能、体验 |
| refactor | 代码重构 |
| revert | 回滚到上一个版本 |
| style | 代码格式修改, 注意不是 css 修改 |
| test | 测试用例修改 |
| build | 编译相关的修改，例如发布版本、对项目构建或者依赖的改动 |
| chore | 其他修改, 比如改变构建流程、或者增加依赖库、工具等 |
| update | 普通更新 |

	

- 使用方式：

git commit -m 'feat: 增加 xxx 功能'
git commit -m 'fix(account): 修复xxx的bug'
在项目根目录创建名为commitlint.config.js的文件，代码如下：
```javascript
/*
 * @Description: commit-msg提交信息格式规范
 * 
 * commit-msg格式: <type>(scope?): <subject>
 *   - type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
 *     - build: 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
 *     - chore: 其他修改, 比如改变构建流程、或者增加依赖库、工具等
 *     - ci: 持续集成修改
 *     - docs: 文档修改
 *     - feat: 新特性、新功能
 *     - fix: 修改bug
 *     - perf: 优化相关，比如提升性能、体验
 *     - refactor: 代码重构
 *     - revert: 回滚到上一个版本
 *     - style: 代码格式修改, 注意不是 css 修改
 *     - test: 测试用例修改
 *   - scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
 *   - Subject：一句话描述此次提交的主要内容，做到言简意赅
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'build', 'chore', 'revert', 'style', 'test'],
    ],
    'type-empty': [2, 'never'], // <type> 不能为空
    // 'type-case': [2, 'always', 'lower-case'], // <type>格式小写
    'type-case': [0],
    'scope-empty': [0],
    // 'scope-case': [2, 'always', 'lower-case'], // <scope> 格式 小写
    'scope-case': [0],
    'subject-empty': [2, 'never'], // <subject> 不能为空 (默认)
    // 'subject-full-stop': [2, 'never', '.'], // <subject> 以.为结束标志
    'subject-full-stop': [0, 'never'],
    // 'subject-case': [2, 'never', 'lower-case'],
    'subject-case': [0, 'never'],
      // case可选值
      // 'lower-case' 小写 lowercase
      // 'upper-case' 大写 UPPERCASE
      // 'camel-case' 小驼峰 camelCase
      // 'kebab-case' 短横线 kebab-case
      // 'pascal-case' 大驼峰 PascalCase
      // 'sentence-case' 首字母大写 Sentence case
      // 'snake-case' 下划线 snake_case
      // 'start-case' 所有首字母大写 start-case

    'header-max-length': [0, 'always', 72], // header 最长72
    // 'body-leading-blank': [2, 'always'], // body换行
    // 'footer-leading-blank': [1, 'always'], // <footer> 以空行开头
  },
};
```
rule由name和配置数组组成，如：'name: [0, 'always', 72]'，数组中第一位表示level，可选0,1,2，0为disable，1为warning，2为error，第二位表示是否应用，可选always|never，第三位表示该rule的值。

如果commit message的格式不符合上述要求，则会报错，检查不通过

::: danger
✔ Preparing...  
✔ Running tasks...  
✔ Applying modifications...  
✔ Cleaning up...  
⧗   input: 修改bug  
✖   subject may not be empty [subject-empty]  
✖   found 1 problems, 0 warnings  
ⓘ   Get help: [https://github.com/conventional-changelog/commitlint/#what-is-commitlint](https://github.com/conventional-changelog/commitlint/#what-is-commitlint)  
> husky - commit-msg hook exited with code 1 (error)
:::


至此，整套流程工具全部配置完毕，按照下面操作：
代码改动（lint-staged中配置的指定目录指定文件的改动才进行格式化）
执行git add .将改动的内容添加到暂存区
执行git commit -m "feat: 新增xxx功能"
程序会自动执行 代码检查、代码格式化、然后commit提交。
当然，如果暂时不想commit代码，可以在执行 git add . 命令后直接执行 npm run lint进行代码检查和格式化，接着继续进行开发。

以上是团队开发时，在项目中统一配置的规则，团队成员只需要拉取代码，执行npm install后，即可使用。

我们也可以使用VSCode搭配一些插件来实现代码检查、提示和格式化操作，下面分享下VSCode中的eslint配置。
新建.vscode文件夹，在里面创建settings.json文件（vscode工作区配置）
```javascript
{
  "eslint.alwaysShowStatus": true,
  // Run the linter on save (onSave) or on type (onType)
  "eslint.run": "onType",
  // #每次保存的时候自动格式化
  "editor.formatOnSave": false,
  // #每次保存的时候将代码按eslint格式进行修复
  // "eslint.autoFixOnSave": false,
  // 下面是新版本vscode配置方式
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    },
  ],
  "vetur.format.options.tabSize": 2,
  // html格式化依赖  默认为none使用内置的prettyhtml进行格式化 #这个按用户自身习惯选择
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // 让vue中的js按编辑器自带的ts格式进行格式化 #没有下边这个 上边不生效
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      // #vue组件中html代码格式化样式
      // "preserve_newlines": true, // 允许空行
      // "wrap_attributes": "force-aligned",
      // "wrap_attributes": "force-expand-multiline",
      // "wrap_attributes": "aligned-multiple",
      "wrap_attributes": "preserve-aligned",
      "wrap_line_length": 0,
      "indent_size": 2,
      // "end_with_newline": true
    },
  },
  // 让prettier使用eslint的代码格式进行校验
  "prettier.eslintIntegration": true,
  "prettier.semi": true, // 是否添加分号
  "prettier.tabWidth": 2, // 每个制表符占用的空格数 (根据项目的代码规范来设置)
  "prettier.useTabs": false, // 缩进不使用tab，使用空格
  "prettier.singleQuote": true, // 单引号包裹字符串
  "prettier.printWidth": 600, // 单行代码的最大宽度
  "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
  "prettier.jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
  "prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
  // "vetur.validation.template": true, // 用于检查代码的 <template> 部分
  // 比如vue中methods的方法 init () {} 去掉init和()之间的空格变成 init() {}
  "javascript.format.insertSpaceBeforeFunctionParenthesis": false,
  // es5风格的函数名与圆括号之间是否加空格
  // 比如 function init () {} 去掉init和()之间的空格变成 function init() {}
  "javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": false,
  "[vue]": {
    // vue文件使用vetur进行格式化
    "editor.defaultFormatter": "octref.vetur"
  },
  "[javascript]": {
    // "editor.defaultFormatter": "vscode.typescript-language-features"
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    // 可以单独给指定类型文件进行自动保存，可以和editor.codeActionsOnSave共存
    // "editor.formatOnSave": true
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    // "editor.defaultFormatter": "HookyQR.beautify"
    // 可以单独给指定类型文件进行自动保存，可以和editor.codeActionsOnSave共存
    // "editor.formatOnSave": true
  },
  "[scss]": {
    "editor.defaultFormatter": "michelemelluso.code-beautifier"
    // 可以单独给指定类型文件进行自动保存，可以和editor.codeActionsOnSave共存
    // "editor.formatOnSave": true
  },
}
```
