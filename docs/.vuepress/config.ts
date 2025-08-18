import { defaultTheme } from '@vuepress/theme-default';
import { defineUserConfig } from 'vuepress';
import { navbar, sidebar } from './config/index';
import { searchPlugin } from '@vuepress/plugin-search';
import { commentPlugin } from 'vuepress-plugin-comment2';
import { getDirname, path } from '@vuepress/utils';
const __dirname = getDirname(import.meta.url);

const REPO = '/MelodyLLL_BLOG/';
export default defineUserConfig({
	head: [
		['link', { rel: 'icon', href: `/images/avator.webp` }],
	],
	pagePatterns: ['**/*.md', '!.vuepress', '!node_modules','!**/_*.md'],
	lang: 'zh-CN',
	base: '/',
	title: '改变 就是好事',
	description: 'Change is a good thing',
	locales: {},
	theme: defaultTheme({
		logo: `/images/avator.webp`,
		// 在这里进行配置
		navbar,
		sidebar,
		lastUpdatedText: '最后修改时间',
		contributorsText: '编写者',
		locales: {},
		notFound: ['这个页面不存在奥', '呀，迷路了', '这个页面可能被作者删除了'],
		backToHome: '返回主页',
	}),
	alias: {
		'@theme/CustomHomeHero.vue': path.resolve(
			__dirname,
			'./components/CustomHomeHero.vue'
		),
		'@theme/HomeHero.vue': path.resolve(
			__dirname,
			'./components/CustomHomeHero.vue'
		),
	},
	plugins: [
		searchPlugin({
			locales: {
				'/': {
					placeholder: 'S键聚焦',
				},
				'/zh/': {
					placeholder: 'Search',
				},
			},
		}),
		commentPlugin({
			provider: 'Giscus',
			repo: 'MelodyLLL/MelodyLLL_BLOG',
			repoId: 'R_kgDOJVWgfQ',
			category: 'Announcements',
			categoryId: 'DIC_kwDOJVWgfc4CW_RA',
		}),
		// docsearchPlugin({
		// 	appId: 'P4GU92VB5C',
		// 	apiKey: 'ae197cd22ef4b0b10b98df21f8e17725',
		// 	indexName: 'kangkangfun',
		// 	locales: {
		// 		'/en': {
		// 			placeholder: 'Search Documentation',
		// 			translations: {
		// 				button: {
		// 					buttonText: 'Search Documentation',
		// 				},
		// 			},
		// 		},
		// 		'/': {
		// 			placeholder: '搜索文档',
		// 			translations: {
		// 				button: {
		// 					buttonText: '搜索文档',
		// 				},

		// 			},
		// 		},
		// 	},
		// }),
	],
});
