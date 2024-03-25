import{_ as n,o as s,c as a,a as t}from"./app-abb8a49b.js";const p={},e=t(`<h1 id="vscode-插件开发" tabindex="-1"><a class="header-anchor" href="#vscode-插件开发" aria-hidden="true">#</a> vscode 插件开发</h1><p>一个 i18n 翻译查看工具的核心代码，待补充开发过程</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> vscode <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;vscode&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">showI18NWords</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token keyword">const</span> editor <span class="token operator">=</span> vscode<span class="token punctuation">.</span>window<span class="token punctuation">.</span>activeTextEditor<span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>editor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 检查选择变化是否由鼠标双击触发</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>kind <span class="token operator">===</span> vscode<span class="token punctuation">.</span>TextEditorSelectionChangeKind<span class="token punctuation">.</span>Mouse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">const</span> selection <span class="token operator">=</span> editor<span class="token punctuation">.</span>selection<span class="token punctuation">;</span>
		<span class="token keyword">const</span> selectedText <span class="token operator">=</span> editor<span class="token punctuation">.</span>document<span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span>selection<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// 判断是否在 Vue 或 JS 文件中</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isVueOrJsFile</span><span class="token punctuation">(</span>editor<span class="token punctuation">.</span>document<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> selectedText<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">const</span> line <span class="token operator">=</span> editor<span class="token punctuation">.</span>document<span class="token punctuation">.</span><span class="token function">lineAt</span><span class="token punctuation">(</span>selection<span class="token punctuation">.</span>start<span class="token punctuation">.</span>line<span class="token punctuation">)</span><span class="token punctuation">.</span>text<span class="token punctuation">;</span>

			<span class="token keyword">const</span> index <span class="token operator">=</span> selection<span class="token punctuation">.</span>start<span class="token punctuation">.</span>character <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>index <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> line<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>index <span class="token operator">-</span> <span class="token number">4</span><span class="token punctuation">,</span> index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;i18n.&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token comment">// const key = line.substring(index - 4, index);</span>
				<span class="token keyword">const</span> i18nFilePath <span class="token operator">=</span> <span class="token function">findI18nFilePath</span><span class="token punctuation">(</span>editor<span class="token punctuation">.</span>document<span class="token punctuation">)</span><span class="token punctuation">;</span>

				<span class="token keyword">if</span> <span class="token punctuation">(</span>i18nFilePath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
					<span class="token keyword">const</span> i18nObject <span class="token operator">=</span> <span class="token function">extractI18nObject</span><span class="token punctuation">(</span>i18nFilePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
					<span class="token keyword">if</span> <span class="token punctuation">(</span>i18nObject<span class="token punctuation">[</span>selectedText<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
						<span class="token function">createPopover</span><span class="token punctuation">(</span>editor<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">中文：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>i18nObject<span class="token punctuation">[</span>selectedText<span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token comment">// showStatusBarNotification(\`中文：\${i18nObject[selectedText]}\`);</span>
					<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
						<span class="token comment">// 在编辑器中设置装饰器</span>
						<span class="token function">createPopover</span><span class="token punctuation">(</span>editor<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">找不到对应的中文翻译: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>selectedText<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
						<span class="token comment">// 定时清除装饰器</span>

						<span class="token comment">// showStatusBarNotification(</span>
						<span class="token comment">// 	\`找不到对应的中文翻译: \${selectedText}\`</span>
						<span class="token comment">// );</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
				<span class="token comment">// const chineseText = findChineseText(key);</span>

				<span class="token comment">// 	// 显示浮窗</span>
				<span class="token comment">// 	vscode.window.showInformationMessage(chineseText, range);</span>
				<span class="token comment">// } else {</span>
				<span class="token comment">// 	vscode.window.showWarningMessage(\`找不到对应的中文翻译: \${key}\`);</span>
				<span class="token comment">// }</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">createPopover</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">editor<span class="token punctuation">,</span> msg</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
	<span class="token keyword">const</span> selection <span class="token operator">=</span> editor<span class="token punctuation">.</span>selection<span class="token punctuation">;</span>
	<span class="token keyword">const</span> position <span class="token operator">=</span> selection<span class="token punctuation">.</span>active<span class="token punctuation">;</span>
	<span class="token comment">// const word = editor.document.getText(selection);</span>
	<span class="token comment">// const range = new vscode.Range(position, position.translate(0, word.length));</span>

	<span class="token comment">// 创建装饰器范围</span>
	<span class="token keyword">const</span> range <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">vscode<span class="token punctuation">.</span>Range</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> position<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">const</span> popoverDecorationType <span class="token operator">=</span> vscode<span class="token punctuation">.</span>window<span class="token punctuation">.</span><span class="token function">createTextEditorDecorationType</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
		<span class="token literal-property property">after</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token literal-property property">margin</span><span class="token operator">:</span> <span class="token string">&#39;10px&#39;</span><span class="token punctuation">,</span>
			<span class="token literal-property property">contentText</span><span class="token operator">:</span> msg<span class="token punctuation">,</span>
			<span class="token literal-property property">backgroundColor</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">vscode<span class="token punctuation">.</span>ThemeColor</span><span class="token punctuation">(</span><span class="token string">&#39;editorHoverWidget.foreground&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">vscode<span class="token punctuation">.</span>ThemeColor</span><span class="token punctuation">(</span><span class="token string">&#39;editorHoverWidget.background&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token literal-property property">borderRadius</span><span class="token operator">:</span> <span class="token string">&#39;5px&#39;</span><span class="token punctuation">,</span>
			<span class="token literal-property property">padding</span><span class="token operator">:</span> <span class="token string">&#39;10px&#39;</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 在编辑器中设置装饰器</span>
	editor<span class="token punctuation">.</span><span class="token function">setDecorations</span><span class="token punctuation">(</span>popoverDecorationType<span class="token punctuation">,</span> <span class="token punctuation">[</span>range<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token comment">// 定时清除装饰器</span>
	<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
		editor<span class="token punctuation">.</span><span class="token function">setDecorations</span><span class="token punctuation">(</span>popoverDecorationType<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">4200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">isVueOrJsFile</span><span class="token punctuation">(</span><span class="token parameter">document</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token punctuation">(</span>
		document<span class="token punctuation">.</span>languageId <span class="token operator">===</span> <span class="token string">&#39;vue&#39;</span> <span class="token operator">||</span>
		document<span class="token punctuation">.</span>languageId <span class="token operator">===</span> <span class="token string">&#39;javascript&#39;</span> <span class="token operator">||</span>
		document<span class="token punctuation">.</span>languageId <span class="token operator">===</span> <span class="token string">&#39;javascriptreact&#39;</span>
	<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">findI18nFilePath</span><span class="token punctuation">(</span><span class="token parameter">document</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">const</span> rootPath <span class="token operator">=</span> vscode<span class="token punctuation">.</span>workspace<span class="token punctuation">.</span>rootPath<span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>rootPath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">const</span> currentFilePath <span class="token operator">=</span> document<span class="token punctuation">.</span>uri<span class="token punctuation">.</span>fsPath<span class="token punctuation">;</span>

	<span class="token keyword">const</span> fileContent <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">const</span> importMatch <span class="token operator">=</span> fileContent<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>
		<span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">import\\s*_i18n\\s*from\\s*[&#39;&quot;](.*.js)[&#39;&quot;]</span><span class="token regex-delimiter">/</span></span>
	<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span>importMatch <span class="token operator">&amp;&amp;</span> importMatch<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">const</span> relativePath <span class="token operator">=</span> importMatch<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

		<span class="token keyword">const</span> i18nFilePath <span class="token operator">=</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>
			path<span class="token punctuation">.</span><span class="token function">dirname</span><span class="token punctuation">(</span>currentFilePath<span class="token punctuation">)</span><span class="token punctuation">,</span>
			relativePath
		<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// const i18nFilePath = path.join(rootPath, resolvedPath);</span>

		<span class="token comment">// const absolutePath = resolve(relativePath);</span>
		<span class="token comment">// const i18nFilePath = vscode.Uri.file(relativePath).fsPath;</span>
		<span class="token keyword">return</span> i18nFilePath<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">extractI18nObject</span><span class="token punctuation">(</span><span class="token parameter">filePath</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">try</span> <span class="token punctuation">{</span>
		<span class="token keyword">const</span> fileContent <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>filePath<span class="token punctuation">,</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token comment">// 使用正则表达式匹配 export default function _i18n</span>
		<span class="token keyword">const</span> match <span class="token operator">=</span> fileContent<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>
			<span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">function\\s*_i18n\\s*\\(i18nLanguage\\)\\s*\\{([\\s\\S]*)\\}</span><span class="token regex-delimiter">/</span></span>
		<span class="token punctuation">)</span><span class="token punctuation">;</span>

		<span class="token keyword">if</span> <span class="token punctuation">(</span>match <span class="token operator">&amp;&amp;</span> match<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token comment">// 提取函数体部分</span>
			<span class="token keyword">const</span> functionBody <span class="token operator">=</span> match<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

			<span class="token comment">// 使用 new Function 创建一个函数</span>
			<span class="token keyword">const</span> i18nFunction <span class="token operator">=</span> <span class="token function">eval</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">(</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>functionBody<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token comment">// 调用 i18n 方法获取 language 对象</span>
			<span class="token keyword">const</span> language <span class="token operator">=</span> <span class="token function">i18nFunction</span><span class="token punctuation">(</span><span class="token string">&#39;zhCn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 此处的参数 &#39;zhCn&#39; 应该替换为实际的语言标识</span>

			<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> language <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> language<span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;解析 i18n 文件时出错:&#39;</span><span class="token punctuation">,</span> error<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 注册鼠标悬停提示</span>
	context<span class="token punctuation">.</span>subscriptions<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>
		vscode<span class="token punctuation">.</span>window<span class="token punctuation">.</span><span class="token function">onDidChangeTextEditorSelection</span><span class="token punctuation">(</span>showI18NWords<span class="token punctuation">)</span>
	<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(p,[["render",c],["__file","vscode.html.vue"]]);export{r as default};
