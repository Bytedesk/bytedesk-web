#!/bin/bash

# 本地路径
DIST=dist
# 服务器地址
SERVER_HOST=124.220.58.234
# 服务器路径
TARGET_DIST=/var/www/html/weiyuai/reactdemo/

# 清理 dist 目录
echo "Cleaning dist directory..."
rm -rf ./$DIST

# 打包完，复制
echo "Building project..."
# 打包完，上传到服务器
yarn build && \
scp -r ./$DIST/* root@$SERVER_HOST:$TARGET_DIST
