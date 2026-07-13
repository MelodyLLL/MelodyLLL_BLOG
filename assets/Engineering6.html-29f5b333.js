import{_ as n,c as s,e as a,i as t}from"./app-02424545.js";const p={},e=t(`<h1 id="全局定时器" tabindex="-1"><a class="header-anchor" href="#全局定时器" aria-hidden="true">#</a> 全局定时器</h1><p>适用于公司如小程序，添加活动倒计时的场景，在瀑布墙等组件中会有非常多的倒计时。如果每个使用一个 setTimeout，点击到详情页内部再次渲染瀑布墙会导致性能问题，页面卡顿。下面的三个重点：</p><ol><li><p>时间补偿机制 通过公式 startTime + count * fps - currentTime 动态调整下次执行时间，避免累计误差。</p></li><li><p>集中式管理 所有定时任务由单个 setTimeout 驱动，比原生多个定时器更节省资源。</p></li><li><p>全局缓存 GlobalTickerCache 实现同帧率 Ticker 的单例复用。</p></li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token string">&#39;use strict&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> GlobalTickerCache <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Ticker</span> <span class="token punctuation">{</span>
	<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">fps <span class="token operator">=</span> <span class="token number">1000</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>timeoutCallbacks <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>intervalCallbacks <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>timerId <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>isRun <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>fps <span class="token operator">=</span> fps<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 开始计时
	 */</span>
	<span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>isRun<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span> <span class="token comment">// 防止重复启动</span>

		<span class="token keyword">this</span><span class="token punctuation">.</span>startTime <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>isRun <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 暂停
	 */</span>
	<span class="token function">pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">clearTimeout</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>isRun <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 停止
	 */</span>
	<span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">clearTimeout</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>isRun <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 恢复
	 */</span>
	<span class="token function">resume</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 清除所有任务
	 */</span>
	<span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>timeoutCallbacks <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>intervalCallbacks <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// 新增：从缓存中移除空闲实例</span>
		<span class="token comment">// if (</span>
		<span class="token comment">// 	Object.keys(this.timeoutCallbacks).length === 0 &amp;&amp;</span>
		<span class="token comment">// 	Object.keys(this.intervalCallbacks).length === 0</span>
		<span class="token comment">// ) {</span>
		<span class="token comment">// 	delete GlobalTickerCache[this.fps];</span>
		<span class="token comment">// }</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 定时执行，只执行一次
	 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">callback</span>
	 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>
	 */</span>
	<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>timeoutCallbacks<span class="token punctuation">[</span><span class="token operator">++</span><span class="token keyword">this</span><span class="token punctuation">.</span>timerId<span class="token punctuation">]</span> <span class="token operator">=</span> callback<span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>timerId<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 定时执行，会重复执行
	 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>Function<span class="token punctuation">}</span></span> <span class="token parameter">callback</span>
	 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span>
	 */</span>
	<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>intervalCallbacks<span class="token punctuation">[</span><span class="token operator">++</span><span class="token keyword">this</span><span class="token punctuation">.</span>timerId<span class="token punctuation">]</span> <span class="token operator">=</span> callback<span class="token punctuation">;</span>
		<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>timerId<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 移除定时器
	 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">timerId</span>
	 */</span>
	<span class="token function">clearTimeout</span><span class="token punctuation">(</span><span class="token parameter">timerId</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>timeoutCallbacks<span class="token punctuation">[</span>timerId<span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	 * 移除定时器
	 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">timerId</span>
	 */</span>
	<span class="token function">clearInterval</span><span class="token punctuation">(</span><span class="token parameter">timerId</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>intervalCallbacks<span class="token punctuation">[</span>timerId<span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">clearTimeout</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>isRun<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>lastTime <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token keyword">const</span> nextFps <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>startTime <span class="token operator">+</span> <span class="token operator">++</span><span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">*</span> <span class="token keyword">this</span><span class="token punctuation">.</span>fps <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lastTime<span class="token punctuation">;</span>
			<span class="token keyword">this</span><span class="token punctuation">.</span>timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> nextFps<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token function">tick</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// 执行一次性回调</span>
		Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>timeoutCallbacks<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">timerId</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
			<span class="token keyword">const</span> callback <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>timeoutCallbacks<span class="token punctuation">[</span>timerId<span class="token punctuation">]</span><span class="token punctuation">;</span>
			<span class="token keyword">try</span> <span class="token punctuation">{</span>
				<span class="token keyword">typeof</span> callback <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>timeoutCallbacks<span class="token punctuation">[</span>timerId<span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// 执行周期性回调</span>
		Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>intervalCallbacks<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">timerId</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
			<span class="token keyword">const</span> callback <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>intervalCallbacks<span class="token punctuation">[</span>timerId<span class="token punctuation">]</span><span class="token punctuation">;</span>
			<span class="token keyword">try</span> <span class="token punctuation">{</span>
				<span class="token keyword">typeof</span> callback <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * 创建Ticker实例
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token optional-parameter"><span class="token punctuation">[</span><span class="token parameter">fps</span><span class="token punctuation">=</span><span class="token code language-javascript"><span class="token number">1000</span></span><span class="token punctuation">]</span></span> 帧率，单位毫秒
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>Ticker<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">function</span> <span class="token function">createTicker</span><span class="token punctuation">(</span><span class="token parameter">fps <span class="token operator">=</span> <span class="token number">1000</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">let</span> ticker <span class="token operator">=</span> GlobalTickerCache<span class="token punctuation">[</span>fps<span class="token punctuation">]</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ticker<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		ticker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Ticker</span><span class="token punctuation">(</span>fps<span class="token punctuation">)</span><span class="token punctuation">;</span>
		GlobalTickerCache<span class="token punctuation">[</span>fps<span class="token punctuation">]</span> <span class="token operator">=</span> ticker<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	ticker<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> ticker<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> Ticker<span class="token punctuation">,</span> createTicker <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","Engineering6.html.vue"]]);export{k as default};
