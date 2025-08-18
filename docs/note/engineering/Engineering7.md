# 自研 i18n 国际化工具

## 使用方式

本工具为一个 node 项目，由开发与业务人员共同配合完成翻译过程

1. 开发人员打开 node 项目，在配置文件中填入需要翻译项目的文件地址以及其他配置。
2. 运行 `npm run scanner`，即可扫描出项目中的中文并且生产对应的 excel 文件。
3. 业务人员拿 excel 进行翻译，并将翻译填充到 excel 对应的空格中。
4. 开发人员拿到 excel，运行`npm run insert`命令即可完成 i18n 文件的生成以及 vue/js 文件中对应的字符替换。
5. 开发进行一些微调以满足 100%的翻译正确率。

## 配套 vscode 插件

一个 i18n 翻译查看工具的核心代码，搭配自研 i18n 工具使用

<img src="https://cdn.jsdelivr.net/gh/MelodyLLL/cdnImg/myImg/screenshot1.png" style="zoom:65%;display:block;margin:0 auto"/>

## 开发 vscode 插件的流程

1. 使用 yeoman 脚手架工具生成项目
2. package.json 中配置插件名称等，这里 activationEvents 比较重要，表示激活插件等时机
3. extension.js 是开发的核心文件，这里导出 active 和 deactive 两个方法，代表在插件激活和禁用时运行
4. 可以从 const vscode = require('vscode') vscode 的包中调用很多重要的 api，如判断是否双击激活插件

## 插件代码

插件实现的核心代码

```js
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

const showI18NWords = (event) => {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return;
	}

	// 检查选择变化是否由鼠标双击触发
	if (event.kind === vscode.TextEditorSelectionChangeKind.Mouse) {
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);

		// 判断是否在 Vue 或 JS 文件中
		if (isVueOrJsFile(editor.document) && selectedText) {
			const line = editor.document.lineAt(selection.start.line).text;

			const index = selection.start.character - 1;
			if (index >= 0 && line.substring(index - 4, index + 1) === 'i18n.') {
				// const key = line.substring(index - 4, index);
				const i18nFilePath = findI18nFilePath(editor.document);

				if (i18nFilePath) {
					const i18nObject = extractI18nObject(i18nFilePath);
					if (i18nObject[selectedText]) {
						createPopover(editor, `中文：${i18nObject[selectedText]}`);
						// showStatusBarNotification(`中文：${i18nObject[selectedText]}`);
					} else {
						// 在编辑器中设置装饰器
						createPopover(editor, `找不到对应的中文翻译: ${selectedText}`);
						// 定时清除装饰器

						// showStatusBarNotification(
						// 	`找不到对应的中文翻译: ${selectedText}`
						// );
					}
				}
				// const chineseText = findChineseText(key);

				// 	// 显示浮窗
				// 	vscode.window.showInformationMessage(chineseText, range);
				// } else {
				// 	vscode.window.showWarningMessage(`找不到对应的中文翻译: ${key}`);
				// }
			}
		}
	}
};

const createPopover = (editor, msg) => {
	const selection = editor.selection;
	const position = selection.active;
	// const word = editor.document.getText(selection);
	// const range = new vscode.Range(position, position.translate(0, word.length));

	// 创建装饰器范围
	const range = new vscode.Range(position, position);
	const popoverDecorationType = vscode.window.createTextEditorDecorationType({
		after: {
			margin: '10px',
			contentText: msg,
			backgroundColor: new vscode.ThemeColor('editorHoverWidget.foreground'),
			color: new vscode.ThemeColor('editorHoverWidget.background'),
			borderRadius: '5px',
			padding: '10px',
		},
	});

	// 在编辑器中设置装饰器
	editor.setDecorations(popoverDecorationType, [range]);

	// 定时清除装饰器
	setTimeout(() => {
		editor.setDecorations(popoverDecorationType, []);
	}, 4200);
};

function isVueOrJsFile(document) {
	return (
		document.languageId === 'vue' ||
		document.languageId === 'javascript' ||
		document.languageId === 'javascriptreact'
	);
}

function findI18nFilePath(document) {
	const rootPath = vscode.workspace.rootPath;
	if (!rootPath) {
		return undefined;
	}

	const currentFilePath = document.uri.fsPath;

	const fileContent = document.getText();
	const importMatch = fileContent.match(
		/import\s*_i18n\s*from\s*['"](.*.js)['"]/
	);
	if (importMatch && importMatch[1]) {
		const relativePath = importMatch[1];

		const i18nFilePath = path.resolve(
			path.dirname(currentFilePath),
			relativePath
		);

		// const i18nFilePath = path.join(rootPath, resolvedPath);

		// const absolutePath = resolve(relativePath);
		// const i18nFilePath = vscode.Uri.file(relativePath).fsPath;
		return i18nFilePath;
	}

	return undefined;
}

function extractI18nObject(filePath) {
	try {
		const fileContent = fs.readFileSync(filePath, 'utf-8');

		// 使用正则表达式匹配 export default function _i18n
		const match = fileContent.match(
			/function\s*_i18n\s*\(i18nLanguage\)\s*\{([\s\S]*)\}/
		);

		if (match && match[0]) {
			// 提取函数体部分
			const functionBody = match[0];

			// 使用 new Function 创建一个函数
			const i18nFunction = eval(`(${functionBody})`);

			// 调用 i18n 方法获取 language 对象
			const language = i18nFunction('zhCn'); // 此处的参数 'zhCn' 应该替换为实际的语言标识

			if (typeof language === 'object') {
				return language;
			}
		}
	} catch (error) {
		console.error('解析 i18n 文件时出错:', error);
	}

	return undefined;
}

module.exports = function (context) {
	// 注册鼠标悬停提示
	context.subscriptions.push(
		vscode.window.onDidChangeTextEditorSelection(showI18NWords)
	);
};
```
