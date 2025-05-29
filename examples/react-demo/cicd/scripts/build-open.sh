#!/bin/bash
###
 # @Author: jackning 270580156@qq.com
 # @Date: 2024-12-31 13:48:46
 # @LastEditors: jackning 270580156@qq.com
 # @LastEditTime: 2025-05-28 12:42:24
 # @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 #   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 #  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 #  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 #  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 #  contact: 270580156@qq.com 
 #  联系：270580156@qq.com
 # Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
### 

# 本地路径
DIST=dist
# 本地路径
TARGET_DIST=/Users/ningjinpeng/Desktop/git/private/github/bytedesk-private/starter/src/main/resources/static/reactdemo

# 清理 dist 目录
echo "Cleaning dist directory..."
rm -rf ./$DIST

# 打包完，复制
echo "Building project..."
yarn build && \
# 将dist文件夹复制到bytedesk-private/starter/src/main/resources/templates/文件夹中，并重命名为chat
echo "Copying to target directory..."
rm -fr $TARGET_DIST && \
cp -r ./$DIST $TARGET_DIST

echo "Build and copy completed!"
