<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-11-21 04:57:04
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-11-28 15:32:16
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
-->
# 微语React前端代码

- 整合 管理后台，客户端，访客端

```bash
export http_proxy=http://127.0.0.1:10818
export https_proxy=http://127.0.0.1:10818
# 安装pnpm
npm install pnpm -g
pnpm install turbo --global
# 创建项目
# pnpm dlx create-turbo@latest
# https://turbo.build/repo/docs/guides/frameworks/vite
pnpm dlx create-turbo@latest -e with-vite
# 启动项目
pnpm build
pnpm dev
# just web
turbo dev --filter=web
# 同时给多个项目安装jest依赖
pnpm install jest --save-dev --recursive --filter=web --filter=@repo/ui --filter=@repo/web
# 添加新的app
# https://turbo.build/repo/docs/guides/frameworks/vite
pnpm create vite@latest apps/admin --template react-ts
pnpm create vite@latest apps/agent --template react-ts
pnpm create vite@latest apps/chat --template react-ts
# 添加新的package
# https://turbo.build/repo/docs/crafting-your-repository/creating-an-internal-package
pnpm create vite@latest packages/my-package --template react-ts
```
