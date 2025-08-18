# 升级 webpack5

## webpack 基本配置

公司的 web 项目构建工具还是使用的 webpack3，热更新功能时好时坏，配置也比较混乱，而且无法使用 babel7 解析 es11 的一些语法。
以及如 webpack5 的一些强大特性 splitChunks 也无法使用(虽然 3 的 CommonsChunkPlugin 也可以拆分，但是它需要额外引入一些差距，其配置比较复杂，也不支持细粒度的配置，而且不支持 webpack runtimechunk 的拆分)，
本次记录下关于 webpack 的一次升级。

首先是基本的 webpack5 大核心模块 **_entry、output、module、plugins、mode_**

### entry

对于 entry，还有一个属性 context 可以提一下，这是一个基础目录属性，因为我们一般在企业里面的项目会把配置文件放到一个单独的 config 文件夹下面。比如此时我当前的配置就是 app/webpack_config， app/src，这里还有一个比较常见的东西是这个 nodejs api: path.resolve「会把一个路径或路径片段的序列解析为一个绝对路径」，在下面就是\_\_dirname 当前 config 目录 + ../ 往上一层。

我们可以像下面一样

```js
 const path = require('path')
 entry: {
    main: path.resolve(__dirname,"..",src/main.js')
  },

```

也可以先定义基础目录

```js
 const path = require('path')

 context: path.resolve(__dirname, '../'),
 entry: {
    app: 'src/main.js'
  },

```

一般我们的应用都是 web 单页应用，最简单的方式是直接传入字符串即可。默认入口 bundle 打出来的名称是 main，也可以像 👆 一样使用对象自定义命名，这里还要提到直接传入一个<font color="#dd0000">[string]字符串数组形式的也是单页面入口应用的定义方式</font>，如我们引入 babel-polyfill 像这样

```js
entry: ['src/main.js', 'babel-polyfill'];
```

这里升级后变化不大

### output

这块比较常用的有 👇 几个属性

- path: 文件的输出目录
- filename: 非异步加载的 bundle 名称
- chunkFilename: 异步加载的 bundle 名称
- publicPath: 设置引用 css，js，img 等资源时候的一个基础路径
- clean: 在生成文件之前清空 output 目录

下面是我的配置，其中 contenthash 是为了做网页缓存的，具体可以参考 [webpack 缓存](https://webpack.docschina.org/guides/caching#root)

```js
 output: {
    path: resolve('dist'),
    publicPath: 'auto',
    // clean: true 交给rimraf
    filename: 'static/js/[name]-[contenthash:8].js',
    chunkFilename: 'static/js/[name]-bundle-[contenthash:8].js'
  },
```

这一块升级后变化也不大

### module

这是更新后的配置，这里需要注意的是两点

- webpack5 的资源模块代替了之前需要安装的 url-loader,file-loader。因此我们可以删除这些依赖。
- 另外就是关于[Vue Loader v15 的变化](https://vue-loader.vuejs.org/zh/migrating.html#%E7%8E%B0%E5%9C%A8%E4%BD%A0%E9%9C%80%E8%A6%81%E4%B8%80%E4%B8%AA%E6%8F%92%E4%BB%B6)

```js
 module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'static/img/[name].[hash:7].[ext]'
        }
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 10 * 1024 // 超过10kb的进行复制，不超过则直接使用base64
        //   }
        // }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource', // 指定静态资源类复制
        generator: {
          filename: 'static/fonts/[name].[hash:7].[ext]' // 放入font目录下
        }
      }
    ]
  },
```

<font color="#dd0000">注意一定要升级所有的 loader！mini-css-extract-plugin 一开始总是无法正常抽取懒加载路由中的 css 发现是 css-loader 为 0.28.0 版本太低导致</font>

### plugins

插件的更替较多，但是用法基本没有变化，直接实例化 webpack 内置的或者安装对应的依赖，我们项目中使用到的一些插件

- ModuleConcatenationPlugin,HashedModuleIdsPlugin webpack5 已内置
- 从 webpack v4 开始，移除了 CommonsChunkPlugin，取而代之的是 optimization.splitChunks
- css 抽取从 ExtractTextPlugin 替换为了 MiniCssExtractPlugin
- css 压缩从 OptimizeCSSPlugin 替换为 CssMinimizerPlugin，js 压缩从 UglifyJsPlugin 更新到了 webpack 内置的 TerserPlugin
- 其他常用插件升级后仅有一些传参变化的如 HtmlWebpackPlugin、CopyWebpackPlugin、DefinePlugin、BundleAnalyzerPlugin、CompressionWebpackPlugin
- 新加入 VueLoaderPlugin、WebpackBar
- 另外如 DllPlugin 发现使用后构建速度提升十多秒，并没有很大的提升

<font color="#dd0000">注意一定要升级所有的插件，下面的这个 warning 就是因为 CopyWebpackPlugin 还在 v4.x 导致的，找了很久的原因</font>

::: danger
(node:81863) [DEP_WEBPACK_COMPILATION_ASSETS] DeprecationWarning: Compilation.assets will be frozen in future, all modifications are deprecated.
BREAKING CHANGE: No more changes should happen to Compilation.assets after sealing the Compilation.
Do changes to assets earlier, e. g. in Compilation.hooks.processAssets.
Make sure to select an appropriate stage from Compilation.PROCESS*ASSETS_STAGE*\*.
(Use `node --trace-deprecation ...` to show where the warning was created)
:::

### mode

- 这里主要是使用 webpack-merge 来做配置文件的拆分，如压缩以及 css 提取等不需要在测试环境打开，注意 webpack-merge 在 5 里面的引用方式需要进行解构了
- 另外就是单独定义了一些环境变量传入到 DefinePlugin
- 老项目的启动方式是编程式的 node build-test.js 与 build.js 以此来分别执行不同的 config，这样定制化程度确实高一些但是也更麻烦，需要安装更多额外的依赖，大概如下这样

```js
'use strict';
require('./check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

const spinner = ora('building for production...');
spinner.start();

rm(
	path.join(config.build.assetsRoot, config.build.assetsSubDirectory),
	(err) => {
		if (err) throw err;
		webpack(webpackConfig, (err, stats) => {
			spinner.stop();
			if (err) throw err;
			process.stdout.write(
				stats.toString({
					colors: true,
					modules: false,
					children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
					chunks: false,
					chunkModules: false,
				}) + '\n\n'
			);

			if (stats.hasErrors()) {
				console.log(chalk.red('  Build failed with errors.\n'));
				process.exit(1);
			}

			console.log(chalk.cyan('  Build complete.\n'));
			console.log(
				chalk.yellow(
					'  Tip: built files are meant to be served over an HTTP server.\n' +
						"  Opening index.html over file:// won't work.\n"
				)
			);
		});
	}
);
```

### 其他

除了这些基础模块，其他如 resolve,devtool,devServer 也都有相应的参数变化。尤其是新增的 optimization 模块

## 关于升级的一些测试保障

- 渐进式升级：先在开发环境验证，再推送到测试环境，可以搭建 test2 环境进行一个中长期的验证。

- 对比构建产物：用 webpack-bundle-analyzer 分析新旧版本的包差异，查看升级是否真的生效以及各个包的情况。

- 回滚预案：通过 Git 分支保留旧版配置，随时可回退。

- 复制出新的文件，防止影响老代码的改动

- 阿里云的一些监控，监控是否有 js 报错等

## babel 配置

babel7 的改变比较大，最明显的是包名的变化，v7 的包名都变成了@babel/xxx，参考[官方指南](https://babeljs.io/docs/v7-migration)，里面有提到 babel-upgrade 工具可进行自动升级，会替换`package.json` 与`.babelrc`中的配置，参考文档可以看到 @babel/preset-env 替换了之前零散的预设，Stage Preset 包 和 polyfill 的引入也进行了变更。<font color="#dd0000">另外要注意 babel-plugin-transform-vue-jsx 对 babel7 的适配，因为有可能出现相关的报错。</font>看到 [babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx) 推荐的是 v4.x 的版本

## 总结

- 升级构建配置，可以重新拉一个仓库和新分支，因为要重新 npm i 替换大量依赖，这样比较方便
- 一定要检查所有的包是否都有更新，不然有一些还未升级的包会导致各种莫名其妙的错误
- vue 可以直接使用 vite 构建，这样开发构建带来的体验冲击感会更大...，虽然社区可能没有那么的完善，但是其实常规项目都够用了
- 还有一些关于 postcss scss 相关的变化，mac 可能会因为 node-sass 版本原因出现诸如此类的报错
  ::: danger
  Node Sass does not yet support your current environment: OS X Unsupported architecture (arm64) with Unsupported runtime (102)
  :::
