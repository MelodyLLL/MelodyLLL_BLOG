import{_ as e,f as p,o,c as i,j as l,g as n,h as s,i as r,a}from"./app-abb8a49b.js";const c={},u=a(`<h1 id="前端基建规范" tabindex="-1"><a class="header-anchor" href="#前端基建规范" aria-hidden="true">#</a> 前端基建规范</h1><h2 id="配置eslint" tabindex="-1"><a class="header-anchor" href="#配置eslint" aria-hidden="true">#</a> 配置eslint</h2><ul><li>安装eslint或者其他相关包（使用框架react,vue等）或者</li><li>使用npx eslint --init自动生成</li></ul><p>创建一个.eslintrc.js文件</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/**
   * 默认情况下，ESLint会在所有父级目录里寻找配置文件，一直到根目录。
   * 为了将ESLint限制在一个特定的项目，设置root: true；
   * ESLint一旦发现配置文件中有 root: true，就会停止在父级目录中寻找。
   */</span>
  <span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// 指定解析器</span>
  <span class="token comment">// babel-ESLint: 一个对Babel解析器的包装，使其能够与ESLint兼容。</span>
  <span class="token comment">// parser: &#39;babel-eslint&#39;,</span>
  <span class="token comment">// 设置解析器能帮助ESLint确定什么是解析错误。</span>
  <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">&#39;vue-eslint-parser&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">&quot;babel-eslint&quot;</span><span class="token punctuation">,</span>
    <span class="token comment">// 指定js版本。语法上的支持</span>
    <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token number">6</span><span class="token punctuation">,</span>
    <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">&quot;module&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">allowImportExportEverywhere</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 脚本在执行期间访问的额外的全局变量</span>
  <span class="token comment">// globals: {},</span>
  <span class="token comment">// env: 指定脚本的运行环境</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 一个环境定义了一组预定义的全局变量。</span>
    <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// 会自动开启es6语法支持。</span>
    <span class="token literal-property property">es6</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">node</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 使用第三方插件。全局安装的 ESLint 实例只能使用全局安装的ESLint插件。本地同理，不支持混用。</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;html&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 配置文件从基础配置中继承已启用的规则。</span>
  <span class="token doc-comment comment">/**
   * eslint:recommended  启用核心规则，在规则页面中被标记为 √ 的。
   */</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// plugin:(此处不能有空格)包名/配置名称。解析时plugin是解析成 eslint-plugin-vue。如果有空格会解析失败，eslint-plugin- vue。</span>
    <span class="token comment">// plugin可以省略包名的前缀 eslint-plugin-</span>
    <span class="token string">&#39;plugin:vue/essential&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;eslint:recommended&#39;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token doc-comment comment">/**
   * 每个规则有【3】个错误级别。
   * off或0: 关闭该规则；
   * warn或1: 开启规则，使用警告级别的错误，不会导致程序退出；
   * error或2: 开启规则，使用错误级别的错误，当被触发的时候，程序会退出。
   */</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 【================================================ Possible Errors ================================================】
     * 这些规则与JavaScript代码中可能的错误或逻辑错误有关。
     */</span>
    <span class="token comment">// 强制&quot;for&quot;循环中更新子句的计算器朝着正确的方向移动</span>
    <span class="token string-property property">&quot;for-direction&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止function定义中出现重名参数</span>
    <span class="token string-property property">&quot;no-dupe-args&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对象字面量中出现重复的key</span>
    <span class="token string-property property">&quot;no-dupe-keys&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止出现重复的case标签</span>
    <span class="token string-property property">&quot;no-duplicate-case&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 console</span>
    <span class="token string-property property">&quot;no-console&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token comment">// &#39;no-console&#39;: p<wbr>rocess.env.NODE_ENV === &#39;production&#39; ? &#39;error&#39;: &#39;off&#39;,</span>
    <span class="token comment">/* // 还可以写表达式，厉害了~
    &#39;no-debugger&#39;: p<wbr>rocess.env.NODE_ENV === &#39;production&#39; ? &#39;error&#39;: &#39;off&#39;,
    &#39;no-console&#39;: p<wbr>rocess.env.NODE_ENV === &#39;production&#39; ? &#39;error&#39;: &#39;off&#39;, */</span>
    
    <span class="token comment">// ......</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果有需要忽略的文件也可以在 .eslintignore 文件中进行配置:</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>build<span class="token comment">/*.js
src/assets
public
dist
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置prettier" tabindex="-1"><a class="header-anchor" href="#配置prettier" aria-hidden="true">#</a> 配置prettier</h2><ul><li><p>安装如下依赖 npm i xxx -D</p><ul><li><strong>prettier</strong>：prettier插件的核心代码</li><li><strong>eslint-plugin-prettier</strong>：将prettier作为ESLint规范来使用</li><li><strong>eslint-config-prettier</strong>：解决ESLint中的样式规范和prettier中样式规范的冲突，以prettier的样式规范为准，使ESLint中的样式规范自动失效</li><li><strong>prettier-eslint-cli</strong>: 允许你对多个文件用prettier-eslint进行格式化。</li></ul></li><li><p>在项目的根目录下创建.prettierrc.js文件并配置prettier代码检查规则:</p></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// .prettierrc.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 让prettier使用eslint的代码格式进行校验</span>
  <span class="token literal-property property">eslintIntegration</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// 缩进</span>
  <span class="token literal-property property">tabWidth</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token comment">// 使用tab还是空格</span>
  <span class="token literal-property property">useTabs</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 最大长度80个字符</span>
  <span class="token literal-property property">printWidth</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>
  <span class="token comment">// 行末分号</span>
  <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 单引号</span>
  <span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// JSX双引号</span>
  <span class="token literal-property property">jsxSingleQuote</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 尽可能使用尾随逗号（包括函数参数）</span>
  <span class="token literal-property property">trailingComma</span><span class="token operator">:</span> <span class="token string">&quot;none&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// 在对象文字中打印括号之间的空格。</span>
  <span class="token literal-property property">bracketSpacing</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// &gt; 标签放在最后一行的末尾，而不是单独放在下一行</span>
  <span class="token literal-property property">jsxBracketSameLine</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 箭头圆括号</span>
  <span class="token literal-property property">arrowParens</span><span class="token operator">:</span> <span class="token string">&quot;avoid&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// 在文件顶部插入一个特殊的 @format 标记，指定文件格式需要被格式化。</span>
  <span class="token literal-property property">insertPragma</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 行尾换行格式</span>
  <span class="token literal-property property">endOfLine</span><span class="token operator">:</span> <span class="token string">&quot;auto&quot;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">HTMLWhitespaceSensitivity</span><span class="token operator">:</span> <span class="token string">&quot;ignore&quot;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>再更新一下eslint的配置，以处理prettier和eslint的冲突。</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// .eslintrc.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 其他配置。。。</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">//继承 vue 的标准特性</span>
    <span class="token string">&quot;plugin:vue/essential&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;eslint:recommended&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;prettier&quot;</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 其他配置不变。。。</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装husky" tabindex="-1"><a class="header-anchor" href="#安装husky" aria-hidden="true">#</a> 安装husky</h2><ul><li>npm i husky --save-dev</li><li>在package.json 中添加 prepare 脚本</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token operator">...</span><span class="token operator">...</span>
  <span class="token string-property property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite build&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;serve&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite preview&quot;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;prepare&quot;</span><span class="token operator">:</span> <span class="token string">&quot;husky install&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 新增prepare脚本</span>
  <span class="token punctuation">}</span>
  <span class="token operator">...</span><span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>执行prepare脚本 npm run prepare，执行 husky install命令时，该命令会创建.husky/目录并指定该目录为git hooks所在的目录。</p></li><li><p>添加git hooks，运行一下命令创建git hooks</p></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>npx husky add <span class="token punctuation">.</span>husky<span class="token operator">/</span>pre<span class="token operator">-</span>commit <span class="token string">&quot;npm run lint&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行完该命令后我们会看到.husky/目录下新增了一个名为pre-commit的shell脚本。也就是说在在执行git commit命令时会先执行pre-commit这个脚本。pre-commit脚本内容如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token hashbang comment">#!/bin/sh</span>
<span class="token punctuation">.</span> <span class="token string">&quot;$(dirname &quot;</span>$0<span class="token string">&quot;)/_/husky.sh&quot;</span>

npm run lint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该脚本的功能就是执行npm run lint这个命令</p><ul><li>添加commit-msg脚本, 执行命令</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>npx husky add <span class="token punctuation">.</span>husky<span class="token operator">/</span>commit<span class="token operator">-</span>msg <span class="token string">&#39;npx --no-install commitlint --edit &quot;$1&quot;&#39;</span>
#or
yarn husky add <span class="token punctuation">.</span>husky<span class="token operator">/</span>commit<span class="token operator">-</span>msg <span class="token string">&#39;yarn commitlint --edit &quot;$1&quot;&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行完该命令后我们会看到.husky/目录下新增了一个名为commit-msg的shell脚本。commitlint可以对commit massage进行格式规范校验，commit-msg脚本内容如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token hashbang comment">#!/bin/sh</span>
<span class="token string">&quot;$(dirname &quot;</span>$0<span class="token string">&quot;)/_/husky.sh&quot;</span>

npx <span class="token operator">--</span>no<span class="token operator">-</span>install commitlint <span class="token operator">--</span>edit <span class="token string">&quot;$1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装配置lint-staged" tabindex="-1"><a class="header-anchor" href="#安装配置lint-staged" aria-hidden="true">#</a> 安装配置lint-staged</h2><ul><li>安装lint-staged</li></ul><p>npm i lint-staged --save-dev</p><ul><li>在 package.json 文件中配置 lint 的命令</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
<span class="token operator">...</span><span class="token operator">...</span>
<span class="token string-property property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
<span class="token string-property property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite&quot;</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite build&quot;</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;serve&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite preview&quot;</span><span class="token punctuation">,</span>
<span class="token string-property property">&quot;prepare&quot;</span><span class="token operator">:</span> <span class="token string">&quot;husky install&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 新增prepare脚本</span>
<span class="token string-property property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;lint-staged --allow-empty&quot;</span>
<span class="token punctuation">}</span>
<span class="token operator">...</span><span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>配置lint-staged命令</li></ul><p>从 v3.1 开始，可以使用不同的方式进行 lint-staged 配置：</p><ul><li>在package.json文件中配置， &quot;src/**/!(*.min).js&quot;表示src目录下所有除了.min.js结尾的.js文件都需要格式化</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token operator">...</span><span class="token operator">...</span>
  <span class="token string-property property">&quot;lint-staged&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;src/**/!(*.min).js&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;prettier --write&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;eslint --fix&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;src/**/*.{ts,vue}&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;prettier --write&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;eslint --fix&quot;</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">&quot;src/**/*.{ts,js,vue,html,css,scss,sass,stylus}&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;prettier --write&quot;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token operator">...</span><span class="token operator">...</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>利用.lintstagedrc文件进行配置，支持JSON或YML格式语法</li><li>利用lint-staged.config.js JS格式的文件进行配置</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token string">&quot;use strict&quot;</span><span class="token punctuation">;</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&quot;{src,server}/**/!(*.min).js&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;eslint --fix&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;prettier --write&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;{src,server}/**/*.{ts,vue}&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;eslint --fix&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;prettier --write&quot;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;src/**/*.{html,css,scss,sass,stylus}&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;prettier --write&quot;</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用 --config 或 -c 标志传递配置文件进行配置</li></ul><h2 id="配置commitlint" tabindex="-1"><a class="header-anchor" href="#配置commitlint" aria-hidden="true">#</a> 配置commitlint</h2><p>最后配置下commitlint，用来定制commit提交规范 commitlint定制提交规范 commitlint是什么： 当我们运行 git commmit -m &#39;xxx&#39; 时，用来检查 xxx 是否满足固定格式的工具。</p><p>为什么使用commitlint：团队中规范了 commit 规范可以更清晰的查看每一次代码提交记录，还可以根据自定义的规则，自动生成 changeLog 文件。</p><ul><li>commitlint安装</li></ul><p>npm install --save-dev @commitlint/config-conventional @commitlint/cli</p><ul><li><p>@commitlint/cli 是commitlint提供的命令行工具，安装后会将cli脚本放置在./node_modules/.bin/目录下</p></li><li><p>@commitlint/config-conventional 是社区中一些共享的配置，我们可以扩展这些配置，也可以不安装这个包自定义配置</p></li><li><p>定制提交格式</p></li></ul><p>代码提交基本格式为：(scope?): type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？ scope: 一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。 Subject: 一句话描述此次提交的主要内容，做到言简意赅 常用的type类别</p><table><thead><tr><th>类型</th><th>描述</th></tr></thead><tbody><tr><td>ci</td><td>持续集成修改</td></tr><tr><td>docs</td><td>文档修改</td></tr><tr><td>feat</td><td>新特性、新功能</td></tr><tr><td>fix</td><td>修改bug</td></tr><tr><td>perf</td><td>优化相关，比如提升性能、体验</td></tr><tr><td>refactor</td><td>代码重构</td></tr><tr><td>revert</td><td>回滚到上一个版本</td></tr><tr><td>style</td><td>代码格式修改, 注意不是 css 修改</td></tr><tr><td>test</td><td>测试用例修改</td></tr><tr><td>build</td><td>编译相关的修改，例如发布版本、对项目构建或者依赖的改动</td></tr><tr><td>chore</td><td>其他修改, 比如改变构建流程、或者增加依赖库、工具等</td></tr><tr><td>update</td><td>普通更新</td></tr></tbody></table><ul><li>使用方式：</li></ul><p>git commit -m &#39;feat: 增加 xxx 功能&#39; git commit -m &#39;fix(account): 修复xxx的bug&#39; 在项目根目录创建名为commitlint.config.js的文件，代码如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/*
 * @Description: commit-msg提交信息格式规范
 * 
 * commit-msg格式: &lt;type&gt;(scope?): &lt;subject&gt;
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
 */</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;@commitlint/config-conventional&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;type-enum&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">[</span><span class="token string">&#39;ci&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;docs&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;feat&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;fix&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;perf&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;refactor&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;build&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;chore&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;revert&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;style&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;test&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;type-empty&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// &lt;type&gt; 不能为空</span>
    <span class="token comment">// &#39;type-case&#39;: [2, &#39;always&#39;, &#39;lower-case&#39;], // &lt;type&gt;格式小写</span>
    <span class="token string-property property">&#39;type-case&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;scope-empty&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// &#39;scope-case&#39;: [2, &#39;always&#39;, &#39;lower-case&#39;], // &lt;scope&gt; 格式 小写</span>
    <span class="token string-property property">&#39;scope-case&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;subject-empty&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// &lt;subject&gt; 不能为空 (默认)</span>
    <span class="token comment">// &#39;subject-full-stop&#39;: [2, &#39;never&#39;, &#39;.&#39;], // &lt;subject&gt; 以.为结束标志</span>
    <span class="token string-property property">&#39;subject-full-stop&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// &#39;subject-case&#39;: [2, &#39;never&#39;, &#39;lower-case&#39;],</span>
    <span class="token string-property property">&#39;subject-case&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token comment">// case可选值</span>
      <span class="token comment">// &#39;lower-case&#39; 小写 lowercase</span>
      <span class="token comment">// &#39;upper-case&#39; 大写 UPPERCASE</span>
      <span class="token comment">// &#39;camel-case&#39; 小驼峰 camelCase</span>
      <span class="token comment">// &#39;kebab-case&#39; 短横线 kebab-case</span>
      <span class="token comment">// &#39;pascal-case&#39; 大驼峰 PascalCase</span>
      <span class="token comment">// &#39;sentence-case&#39; 首字母大写 Sentence case</span>
      <span class="token comment">// &#39;snake-case&#39; 下划线 snake_case</span>
      <span class="token comment">// &#39;start-case&#39; 所有首字母大写 start-case</span>

    <span class="token string-property property">&#39;header-max-length&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span> <span class="token number">72</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// header 最长72</span>
    <span class="token comment">// &#39;body-leading-blank&#39;: [2, &#39;always&#39;], // body换行</span>
    <span class="token comment">// &#39;footer-leading-blank&#39;: [1, &#39;always&#39;], // &lt;footer&gt; 以空行开头</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>rule由name和配置数组组成，如：&#39;name: [0, &#39;always&#39;, 72]&#39;，数组中第一位表示level，可选0,1,2，0为disable，1为warning，2为error，第二位表示是否应用，可选always|never，第三位表示该rule的值。</p><p>如果commit message的格式不符合上述要求，则会报错，检查不通过</p>`,49),d={class:"custom-container danger"},v=n("p",{class:"custom-container-title"},"DANGER",-1),m=n("br",null,null,-1),k=n("br",null,null,-1),b=n("br",null,null,-1),g=n("br",null,null,-1),y=n("br",null,null,-1),q=n("br",null,null,-1),h=n("br",null,null,-1),f={href:"https://github.com/conventional-changelog/commitlint/#what-is-commitlint",target:"_blank",rel:"noopener noreferrer"},j=n("blockquote",null,[n("p",null,"husky - commit-msg hook exited with code 1 (error)")],-1),x=a(`<p>至此，整套流程工具全部配置完毕，按照下面操作： 代码改动（lint-staged中配置的指定目录指定文件的改动才进行格式化） 执行git add .将改动的内容添加到暂存区 执行git commit -m &quot;feat: 新增xxx功能&quot; 程序会自动执行 代码检查、代码格式化、然后commit提交。 当然，如果暂时不想commit代码，可以在执行 git add . 命令后直接执行 npm run lint进行代码检查和格式化，接着继续进行开发。</p><p>以上是团队开发时，在项目中统一配置的规则，团队成员只需要拉取代码，执行npm install后，即可使用。</p><p>我们也可以使用VSCode搭配一些插件来实现代码检查、提示和格式化操作，下面分享下VSCode中的eslint配置。 新建.vscode文件夹，在里面创建settings.json文件（vscode工作区配置）</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">&quot;eslint.alwaysShowStatus&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// Run the linter on save (onSave) or on type (onType)</span>
  <span class="token string-property property">&quot;eslint.run&quot;</span><span class="token operator">:</span> <span class="token string">&quot;onType&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// #每次保存的时候自动格式化</span>
  <span class="token string-property property">&quot;editor.formatOnSave&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// #每次保存的时候将代码按eslint格式进行修复</span>
  <span class="token comment">// &quot;eslint.autoFixOnSave&quot;: false,</span>
  <span class="token comment">// 下面是新版本vscode配置方式</span>
  <span class="token string-property property">&quot;editor.codeActionsOnSave&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;source.fixAll.eslint&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;eslint.validate&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&quot;javascript&quot;</span><span class="token punctuation">,</span>
    <span class="token string">&quot;javascriptreact&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;language&quot;</span><span class="token operator">:</span> <span class="token string">&quot;html&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;autoFix&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;language&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vue&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;autoFix&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;vetur.format.options.tabSize&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token comment">// html格式化依赖  默认为none使用内置的prettyhtml进行格式化 #这个按用户自身习惯选择</span>
  <span class="token string-property property">&quot;vetur.format.defaultFormatter.html&quot;</span><span class="token operator">:</span> <span class="token string">&quot;js-beautify-html&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// 让vue中的js按编辑器自带的ts格式进行格式化 #没有下边这个 上边不生效</span>
  <span class="token string-property property">&quot;vetur.format.defaultFormatter.js&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vscode-typescript&quot;</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;vetur.format.defaultFormatterOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;js-beautify-html&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// #vue组件中html代码格式化样式</span>
      <span class="token comment">// &quot;preserve_newlines&quot;: true, // 允许空行</span>
      <span class="token comment">// &quot;wrap_attributes&quot;: &quot;force-aligned&quot;,</span>
      <span class="token comment">// &quot;wrap_attributes&quot;: &quot;force-expand-multiline&quot;,</span>
      <span class="token comment">// &quot;wrap_attributes&quot;: &quot;aligned-multiple&quot;,</span>
      <span class="token string-property property">&quot;wrap_attributes&quot;</span><span class="token operator">:</span> <span class="token string">&quot;preserve-aligned&quot;</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;wrap_line_length&quot;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;indent_size&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token comment">// &quot;end_with_newline&quot;: true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 让prettier使用eslint的代码格式进行校验</span>
  <span class="token string-property property">&quot;prettier.eslintIntegration&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;prettier.semi&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 是否添加分号</span>
  <span class="token string-property property">&quot;prettier.tabWidth&quot;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">// 每个制表符占用的空格数 (根据项目的代码规范来设置)</span>
  <span class="token string-property property">&quot;prettier.useTabs&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 缩进不使用tab，使用空格</span>
  <span class="token string-property property">&quot;prettier.singleQuote&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 单引号包裹字符串</span>
  <span class="token string-property property">&quot;prettier.printWidth&quot;</span><span class="token operator">:</span> <span class="token number">600</span><span class="token punctuation">,</span> <span class="token comment">// 单行代码的最大宽度</span>
  <span class="token string-property property">&quot;prettier.endOfLine&quot;</span><span class="token operator">:</span> <span class="token string">&quot;auto&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 结尾是 \\n \\r \\n\\r auto</span>
  <span class="token string-property property">&quot;prettier.jsxBracketSameLine&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 在jsx中把&#39;&gt;&#39; 是否单独放一行</span>
  <span class="token string-property property">&quot;prettier.jsxSingleQuote&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 在jsx中使用单引号代替双引号</span>
  <span class="token comment">// &quot;vetur.validation.template&quot;: true, // 用于检查代码的 &lt;template&gt; 部分</span>
  <span class="token comment">// 比如vue中methods的方法 init () {} 去掉init和()之间的空格变成 init() {}</span>
  <span class="token string-property property">&quot;javascript.format.insertSpaceBeforeFunctionParenthesis&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// es5风格的函数名与圆括号之间是否加空格</span>
  <span class="token comment">// 比如 function init () {} 去掉init和()之间的空格变成 function init() {}</span>
  <span class="token string-property property">&quot;javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;[vue]&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// vue文件使用vetur进行格式化</span>
    <span class="token string-property property">&quot;editor.defaultFormatter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;octref.vetur&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;[javascript]&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// &quot;editor.defaultFormatter&quot;: &quot;vscode.typescript-language-features&quot;</span>
    <span class="token string-property property">&quot;editor.defaultFormatter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;esbenp.prettier-vscode&quot;</span>
    <span class="token comment">// 可以单独给指定类型文件进行自动保存，可以和editor.codeActionsOnSave共存</span>
    <span class="token comment">// &quot;editor.formatOnSave&quot;: true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;[html]&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;editor.defaultFormatter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;esbenp.prettier-vscode&quot;</span>
    <span class="token comment">// &quot;editor.defaultFormatter&quot;: &quot;HookyQR.beautify&quot;</span>
    <span class="token comment">// 可以单独给指定类型文件进行自动保存，可以和editor.codeActionsOnSave共存</span>
    <span class="token comment">// &quot;editor.formatOnSave&quot;: true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;[scss]&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&quot;editor.defaultFormatter&quot;</span><span class="token operator">:</span> <span class="token string">&quot;michelemelluso.code-beautifier&quot;</span>
    <span class="token comment">// 可以单独给指定类型文件进行自动保存，可以和editor.codeActionsOnSave共存</span>
    <span class="token comment">// &quot;editor.formatOnSave&quot;: true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function _(w,S){const t=p("ExternalLinkIcon");return o(),i("div",null,[l(` ---
sidebar: auto
--- `),u,n("div",d,[v,n("p",null,[s("✔ Preparing..."),m,s(" ✔ Running tasks..."),k,s(" ✔ Applying modifications..."),b,s(" ✔ Cleaning up..."),g,s(" ⧗   input: 修改bug"),y,s(" ✖   subject may not be empty [subject-empty]"),q,s(" ✖   found 1 problems, 0 warnings"),h,s(" ⓘ   Get help: "),n("a",f,[s("https://github.com/conventional-changelog/commitlint/#what-is-commitlint"),r(t)])]),j]),x])}const L=e(c,[["render",_],["__file","Engineering1.html.vue"]]);export{L as default};
