import{_ as e,b as p,c,e as o,f as n,g as s,h as t,i as l}from"./app-02424545.js";const i={},u=n("h1",{id:"设计模式",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#设计模式","aria-hidden":"true"},"#"),s(" 设计模式")],-1),r=n("h2",{id:"发布订阅模式和观察者模式区别",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#发布订阅模式和观察者模式区别","aria-hidden":"true"},"#"),s(" 发布订阅模式和观察者模式区别")],-1),k={href:"https://zhuanlan.zhihu.com/p/51357583",target:"_blank",rel:"noopener noreferrer"},d=l(`<h2 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h2><p>实现方式可以是使用全局变量和闭包</p><p>懒汉式</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
	<span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我是单例&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// 实例变量</span>
	<span class="token keyword">static</span> instance <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
	<span class="token comment">// 返回唯一实例的静态方法</span>
	<span class="token keyword">static</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 判断是否已经new过1个实例</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Singleton<span class="token punctuation">.</span>instance<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 如果实例不存在，则先new一个实例</span>
			Singleton<span class="token punctuation">.</span>instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 未来不管执行多少次，都返回这个唯一实例</span>
		<span class="token keyword">return</span> Singleton<span class="token punctuation">.</span>instance<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> s1 <span class="token operator">=</span> Singleton<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> s2 <span class="token operator">=</span> Singleton<span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>s2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>饿汉式</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 构造函数中进行初始化工作</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我是单例&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;显示单例的方法&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 饿汉模式在类加载时立即创建实例</span>
	<span class="token keyword">static</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 返回唯一实例的静态方法</span>
	<span class="token keyword">static</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 直接返回已经创建的实例</span>
		<span class="token keyword">return</span> Singleton<span class="token punctuation">.</span>instance<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="工厂模式与策略模式的区别" tabindex="-1"><a class="header-anchor" href="#工厂模式与策略模式的区别" aria-hidden="true">#</a> 工厂模式与策略模式的区别</h2><p>工厂模式解决&quot;如何创建对象&quot;的问题，策略模式解决&quot;如何执行算法&quot;的问题。在策略模式中，会有一个“上下文”类，可以用来切换不同的策略(js中即不同的方法)</p><h2 id="关于工厂模式" tabindex="-1"><a class="header-anchor" href="#关于工厂模式" aria-hidden="true">#</a> 关于工厂模式</h2><p>可能会问到工作中有无使用过，需要知道一些概念，实际上我们最多使用的只是简单工厂。</p><p><strong>简单工厂模式：实际就是在工厂函数中进行不同类的实例化</strong></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 简单工厂模式示例</span>
<span class="token keyword">class</span> <span class="token class-name">AuthClass</span> <span class="token punctuation">{</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> type<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 工厂函数</span>
<span class="token keyword">function</span> <span class="token function">createAuth</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> <span class="token punctuation">(</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token string">&#39;wechat&#39;</span><span class="token operator">:</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AuthClass</span><span class="token punctuation">(</span><span class="token string">&#39;wechat&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">case</span> <span class="token string">&#39;qq&#39;</span><span class="token operator">:</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AuthClass</span><span class="token punctuation">(</span><span class="token string">&#39;qq&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">default</span><span class="token operator">:</span>
			<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AuthClass</span><span class="token punctuation">(</span><span class="token string">&#39;default&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用</span>
<span class="token keyword">const</span> wechatAuth <span class="token operator">=</span> <span class="token function">createAuth</span><span class="token punctuation">(</span><span class="token string">&#39;wechat&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 通过工厂函数创建实例</span>
<span class="token keyword">const</span> qqAuth <span class="token operator">=</span> <span class="token function">createAuth</span><span class="token punctuation">(</span><span class="token string">&#39;qq&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 通过工厂函数创建实例</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>工厂方法模式：区别于简单工厂模式，工厂方法模式定义了一个创建对象的接口，但由子类决定实例化哪个类。工厂方法将对象的创建延迟到子类。</strong></p>`,13),v={href:"https://www.cnblogs.com/anding/p/17625778.html",target:"_blank",rel:"noopener noreferrer"};function m(b,h){const a=p("ExternalLinkIcon");return c(),o("div",null,[u,r,n("blockquote",null,[n("p",null,[n("a",k,[s("观察者模式 vs 发布订阅模式"),t(a)])])]),d,n("blockquote",null,[n("p",null,[n("a",v,[s("工厂模式"),t(a)])])])])}const w=e(i,[["render",m],["__file","k-designPatterns.html.vue"]]);export{w as default};
