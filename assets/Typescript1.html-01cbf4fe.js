import{_ as n,o as s,c as a,a as p}from"./app-abb8a49b.js";const e={},t=p(`<h1 id="typescript常量定义" tabindex="-1"><a class="header-anchor" href="#typescript常量定义" aria-hidden="true">#</a> typescript常量定义</h1><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">Type</span> <span class="token operator">=</span><span class="token string">&#39;type&#39;</span>


<span class="token keyword">export</span> <span class="token keyword">const</span> Type<span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>key <span class="token keyword">in</span> ActivityTabType<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token punctuation">{</span> code<span class="token operator">:</span> key<span class="token punctuation">;</span> desc<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> path<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token punctuation">{</span>
    code<span class="token operator">:</span> <span class="token string">&#39;type&#39;</span><span class="token punctuation">,</span>
    desc<span class="token operator">:</span> <span class="token string">&#39;类型&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">//export type Type =  keyof typeof Type;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> Type <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">get</span> <span class="token constant">NON_TYPE</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      code<span class="token operator">:</span> <span class="token string">&#39;NON_TYPE&#39;</span> <span class="token keyword">as</span> <span class="token keyword">const</span><span class="token punctuation">,</span>
      desc<span class="token operator">:</span> <span class="token string">&#39;未分类&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">Type</span> <span class="token operator">=</span> <span class="token keyword">typeof</span> AppType<span class="token punctuation">[</span><span class="token keyword">keyof</span> <span class="token keyword">typeof</span> Type<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string">&#39;code&#39;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">getTypeDesc</span><span class="token punctuation">(</span>key<span class="token operator">:</span> Type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> obj <span class="token operator">=</span> Type<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> obj <span class="token operator">?</span> obj<span class="token punctuation">.</span>desc <span class="token operator">:</span> key<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种还可以返回组件</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">Type</span> <span class="token operator">=</span> <span class="token string">&#39;INIT&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> Type <span class="token operator">=</span> <span class="token punctuation">(</span>
  status<span class="token operator">:</span> Type<span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  desc<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  badge<span class="token operator">:</span> React<span class="token punctuation">.</span>ReactNode<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>status<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;INIT&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> text <span class="token operator">=</span> <span class="token string">&#39;待填写&#39;</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        desc<span class="token operator">:</span> text<span class="token punctuation">,</span>
        badge<span class="token operator">:</span> <span class="token operator">&lt;</span>Badge color<span class="token operator">=</span><span class="token string">&quot;gray&quot;</span> text<span class="token operator">=</span><span class="token punctuation">{</span>text<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> exhaustiveCheck<span class="token operator">:</span> <span class="token punctuation">{</span> desc<span class="token operator">:</span> <span class="token builtin">never</span><span class="token punctuation">;</span> badge<span class="token operator">:</span> React<span class="token punctuation">.</span>ReactNode <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
        desc<span class="token operator">:</span> status<span class="token punctuation">,</span>
        badge<span class="token operator">:</span> <span class="token operator">&lt;</span>Badge color<span class="token operator">=</span><span class="token string">&quot;gray&quot;</span> text<span class="token operator">=</span><span class="token string">&quot;状态未知&quot;</span> <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> exhaustiveCheck<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),o=[t];function c(l,i){return s(),a("div",null,o)}const u=n(e,[["render",c],["__file","Typescript1.html.vue"]]);export{u as default};
