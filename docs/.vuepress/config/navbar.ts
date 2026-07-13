import { NavbarGroup, NavbarItem } from 'vuepress';
import { resolve } from 'path';
import fs from 'fs';
const interviewDir = resolve(__dirname, '../../interview');
const files = fs.readdirSync(interviewDir);

let firstInterviewFile = '';
if (files.length > 0) {
  firstInterviewFile =
    files.find((item) => item.endsWith('.md') && !item.startsWith('_')) || '';
}

console.log(firstInterviewFile);
interface NavbarItems extends NavbarItem {
  icon?: any;
}
const navbar: (NavbarItems | NavbarGroup | string)[] = [
  {
    text: '首页',
    link: '/',
  },
  {
    text: '面经',
    link: `/interview/${firstInterviewFile}`,
    activeMatch: '/interview',
  },
  {
    text: '游记',
    link: '/trip',
    // activeMatch: '/trip',
    children: [
      {
        text: '澳门',
        link: '/trip/macau.md',
      },
      {
        text: '珠海',
        link: '/trip/zhuhai.md',
      },
      {
        text: '印尼旅行手册',
        link: '/indonesia-trip-guide.html',
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    ]
  },

  {
    text: '笔记',
    // link: '/note/react/React1.md',
    activeMatch: '/note',
    children: [
      // {
      // 	text: 'React相关',
      // 	link: '/note/react/React1.md',
      // },
      {
        text: '前端工程化',
        link: '/note/engineering/Engineering1.md',
      },
      {
        text: 'Typescript',
        link: '/note/typescript/Typescript1.md',
      },
      {
        text: '技术前线',
        link: '/note/new/svelte.md',
      },
    ],
  },
  {
    text: '留言',
    link: '/comment.md',
    activeMatch: '/comment',
  },
];

export default navbar;
