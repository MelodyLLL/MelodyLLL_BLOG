import { SidebarConfig } from 'vuepress';
import { getFileName } from '../utils';
import path from 'path';

const fileNames = getFileName(path.resolve(__dirname, '../../interview'));

const sidebar: SidebarConfig = {
	// SidebarItem
  '/trip/':[
    {
      text: '游记',
      children: ['/trip/macau.md'],
    },
  ],
	'/note/react/': [
		{
			text: 'React笔记',
			// collapsible: true,
			children: ['/note/react/React1.md'],
		},
	],
	'/note/engineering/': [
		{
			text: '前端工程化笔记',
			// collapsible: true,
      children: Array.from({ length: 9 }, (_, i) => `/note/engineering/Engineering${i + 1}.md`)
    },
  ],
  '/note/typescript/': [
    {
      text: 'Typescript笔记',
			// collapsible: true,
			children: ['/note/typescript/Typescript1.md'],
		},
	],
  '/note/new/': [
		{
			text: '技术前线',
			// collapsible: true,
			children: ['/note/new/svelte.md'],
		},
	],
	'/interview/': [
		{
			text: '',
			children: fileNames
				.filter((item) => item.endsWith('.md') && !item.includes('/_'))
				.map((item) => {
					return '/interview/' + path.basename(item);
				}),
		},
	],
};

export default sidebar;
