#!/bin/bash

# 执行 VuePress 打包命令，将生成的 dist 目录输出到 temp 目录
pnpm build

# 创建temp目录
mkdir temp

# 进入 temp 目录
cd temp

# 初始化新的 Git 仓库
git init

# 添加 dist 目录中的所有文件到暂存区
git add .

# 提交并推送到 GitHub 的远程仓库
git commit -m "Deploy dist"

git remote add origin https://github.com/MelodyLLL/MelodyLLL_BLOG.git

git checkout -b gh-pages

# git pull origin gh-pages --allow-unrelated-histories
# 强制推送到远程仓库的 gh-pages 分支
git push -f origin gh-pages

# 返回上一级目录
cd ..

# 删除临时目录
rm -rf temp
