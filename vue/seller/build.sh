#!/bin/bash
# 仅限linux 和 Mac
# 使用前请更改路径

# 项目存放路径
TARGET_PATH=/Users/peter/WorkSpace/Zdongpin/server/wechat/Public/new/seller
# 编译之后的文件路径
SOURCE_PATH=/Users/peter/WorkSpace/Zdongpin/client/main-frontend-laravel/vue/seller/dist
echo "开始编译"
npm run build
echo "编译完成"
echo "开始移动"
DATE=`date`
HOST_NAME=`hostname`
rm -rf $TARGET_PATH/*
sleep 2
cp -R $SOURCE_PATH/* $TARGET_PATH
echo "移动完毕"

echo "开始提交"
cd $TARGET_PATH
git checkout develop
git add ./
git commit -m "Auto-commit ${DATE} ${HOST_NAME}"
git pull origin develop
git push origin develop
echo "提交完毕"
