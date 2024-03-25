import{_ as e,f as o,o as p,c,g as n,h as s,i as t,a as l}from"./app-abb8a49b.js";const i={},u=l(`<h1 id="react" tabindex="-1"><a class="header-anchor" href="#react" aria-hidden="true">#</a> React</h1><h2 id="react-与-vue-的区别" tabindex="-1"><a class="header-anchor" href="#react-与-vue-的区别" aria-hidden="true">#</a> React 与 Vue 的区别</h2><ul><li>模版语法与 jsx</li><li>事件绑定，vue 绑定到 vm 上，react 类组件还需要自己处理 this 指向</li><li>vue 有双向绑定，响应式更加便利，react 单纯的单向数据流，需要手动 setState，有一定的心理负担</li><li>vue 有一些小 trick，事件修饰符，组件属性自动挂到最外层节点等</li><li>diff 算法差异</li><li>生态对比</li></ul><h2 id="虚拟-dom-的比较过程" tabindex="-1"><a class="header-anchor" href="#虚拟-dom-的比较过程" aria-hidden="true">#</a> 虚拟 dom 的比较过程</h2><p>虚拟 dom 本质是一个 js 对象 比较麻烦的写法</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> <span class="token punctuation">[</span>props<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token operator">...</span>children<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>实际上这个可以使用 jsx 的写法，然后通过 babel 转译成上面这样。优点是可以写方便的 jsx，缺点是依赖打包插件 实际上原生 js 插入 dom 节点的操作 在万次操作上是比 react 要快的 虚拟 dom 为什么比真实 dom 操作快</p><ul><li>减少 dom 操作，将多次操作合并为一次</li><li>借助 diff 算法减少多余操作</li></ul><p>总结 操作原生 dom 开销比较大，而且会引发重绘或者重排，react 只是把这些操作放到了虚拟 dom 的比较上面，即 js 对象之间的比较计算，将 dom 操作缓存起来一次性去操作，最后也还是要操作 dom 的，只不过是减少了操作次数，优化了重绘和重排。</p><h2 id="setstate-原理" tabindex="-1"><a class="header-anchor" href="#setstate-原理" aria-hidden="true">#</a> setState 原理</h2><p>大致实现</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> state <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> setters <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> firstRun <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> cursor <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">createSetter</span><span class="token punctuation">(</span><span class="token parameter">cursor</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">setterWithCursor</span><span class="token punctuation">(</span><span class="token parameter">newVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		state<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span> <span class="token operator">=</span> newVal<span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// This is the pseudocode for the useState helper</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token parameter">initVal</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>firstRun<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		state<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>initVal<span class="token punctuation">)</span><span class="token punctuation">;</span>
		setters<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">createSetter</span><span class="token punctuation">(</span>cursor<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		firstRun <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">const</span> setter <span class="token operator">=</span> setters<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token keyword">const</span> value <span class="token operator">=</span> state<span class="token punctuation">[</span>cursor<span class="token punctuation">]</span><span class="token punctuation">;</span>

	cursor<span class="token operator">++</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token punctuation">[</span>value<span class="token punctuation">,</span> setter<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// Our component code that uses hooks</span>
<span class="token keyword">function</span> <span class="token function">RenderFunctionComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">const</span> <span class="token punctuation">[</span>firstName<span class="token punctuation">,</span> setFirstName<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&#39;Rudi&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// cursor: 0</span>
	<span class="token keyword">const</span> <span class="token punctuation">[</span>lastName<span class="token punctuation">,</span> setLastName<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&#39;Yardley&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// cursor: 1</span>

	<span class="token keyword">return</span> <span class="token punctuation">(</span>
		<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
			<span class="token operator">&lt;</span>Button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setFirstName</span><span class="token punctuation">(</span><span class="token string">&#39;Richard&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>Richard<span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
			<span class="token operator">&lt;</span>Button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setFirstName</span><span class="token punctuation">(</span><span class="token string">&#39;Fred&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>Fred<span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
		<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
	<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// This is sort of simulating Reacts rendering cycle</span>
<span class="token keyword">function</span> <span class="token function">MyComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cursor <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// resetting the cursor</span>
	<span class="token keyword">return</span> <span class="token operator">&lt;</span>RenderFunctionComponent <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">;</span> <span class="token comment">// render</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Pre-render: []</span>
<span class="token function">MyComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// First-render: [&#39;Rudi&#39;, &#39;Yardley&#39;]</span>
<span class="token function">MyComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Subsequent-render: [&#39;Rudi&#39;, &#39;Yardley&#39;]</span>

<span class="token comment">// click the &#39;Fred&#39; button</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hooks-使用限制和原因" tabindex="-1"><a class="header-anchor" href="#hooks-使用限制和原因" aria-hidden="true">#</a> hooks 使用限制和原因</h2><ul><li><p>只能在函数组件中使用： Hooks 只能在函数组件中调用，不能在类组件中使用。这是因为 Hooks 是依赖于函数组件的特性的，不能在 class 中正常工作。</p></li><li><p>只能在最顶层使用： 在函数组件的最顶层调用 Hooks，不要在循环、条件语句或嵌套函数中使用。确保在每次渲染时都按照相同的顺序调用 Hooks。</p></li><li><p>自定义 Hook 名称以 &quot;use&quot; 开头： 为了确保 linter 和工具的准确性，自定义 Hook 的名称必须以 &quot;use&quot; 开头。这是一种约定，不遵循这个约定不会导致错误，但会影响工具的准确性。</p></li><li><p>依赖项数组的正确使用： 当使用 useEffect 和 useCallback 等 Hooks 时，需要正确地使用依赖项数组，以确保在依赖项变化时触发更新。忽略依赖项数组可能导致不必要的渲染或副作用。</p></li><li><p>Hook 调用次序： 在函数组件中，Hook 的调用次序必须相同。React 依赖于 Hook 的调用次序来正确地跟踪每个组件的状态。</p></li><li><p>不能在条件语句中使用 Hooks： Hooks 必须在组件的每一次渲染中按照相同的顺序被调用。因此，不能在条件语句中使用 Hooks，因为条件语句可能导致 Hook 的调用顺序发生变化。</p></li></ul><h2 id="reactfiber-是什么" tabindex="-1"><a class="header-anchor" href="#reactfiber-是什么" aria-hidden="true">#</a> reactFiber 是什么</h2><p>参考以下文章：</p>`,16),r={href:"https://zhuanlan.zhihu.com/p/297971861",target:"_blank",rel:"noopener noreferrer"},k=n("h2",{id:"hooks-与-hoc",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#hooks-与-hoc","aria-hidden":"true"},"#"),s(" hooks 与 HOC")],-1),d=n("p",null,"逻辑抽离，然后会问如何抽离，和 HOC 的区别",-1),v=n("h2",{id:"useeffect-和-uselayouteffect-的区别是什么",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#useeffect-和-uselayouteffect-的区别是什么","aria-hidden":"true"},"#"),s(" useEffect 和 useLayoutEffect 的区别是什么")],-1),m={href:"https://zhuanlan.zhihu.com/p/348701319",target:"_blank",rel:"noopener noreferrer"},h=n("h2",{id:"setstate-的执行时机与同步异步",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#setstate-的执行时机与同步异步","aria-hidden":"true"},"#"),s(" setState 的执行时机与同步异步")],-1),b=n("p",null,"在生命周期、事件触发等情况下，连续的 setState 并不会马上更新值，而是批量更新 在 setTimeout 类似的回调中则会同步更新，性能差很多 batchedUpdate 机制",-1),f={href:"https://zh-hans.reactjs.org/docs/faq-state.html#when-is-setstate-asynchronous",target:"_blank",rel:"noopener noreferrer"},_=n("h2",{id:"对-redux-的理解",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#对-redux-的理解","aria-hidden":"true"},"#"),s(" 对 redux 的理解")],-1),g={href:"https://github.com/brickspert/blog/issues/22",target:"_blank",rel:"noopener noreferrer"};function y(x,w){const a=o("ExternalLinkIcon");return p(),c("div",null,[u,n("blockquote",null,[n("p",null,[n("a",r,[s("React Fiber 是什么?"),t(a)])])]),k,d,v,n("blockquote",null,[n("p",null,[n("a",m,[s("useLayoutEffect和useEffect的区别"),t(a)])])]),h,b,n("blockquote",null,[n("p",null,[n("a",f,[s("Component State – React"),t(a)])])]),_,n("blockquote",null,[n("p",null,[n("a",g,[s("完全理解 redux（从零实现一个 redux） · Issue #22 · brickspert/blog"),t(a)])])])])}const H=e(i,[["render",y],["__file","e-react.html.vue"]]);export{H as default};
