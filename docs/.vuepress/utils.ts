import fs from 'fs';
import path from 'path';
const fileNames: string[] = [];

export function getFileName(dir) {
	const stat = fs.statSync(dir);
	if (stat.isDirectory()) {
		//判断是不是目录
		const dirs = fs.readdirSync(dir);
		dirs.forEach((value) => {
			// console.log('路径',path.resolve(dir,value));
			getFileName(path.join(dir, value));
		});
	} else if (stat.isFile()) {
		//判断是不是文件
		fileNames.push(dir);
	}

	return fileNames;
}
