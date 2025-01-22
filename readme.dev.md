<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 14:45:29
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-30 14:01:34
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
-->
# 发布到npmjs

## Publish to npmjs.org

```bash
export http_proxy=http://127.0.0.1:10818
export https_proxy=http://127.0.0.1:10818
# 查看当前registry
npm config get registry
# https://registry.npmmirror.com/
npm config set registry https://registry.npmjs.org/
# 恢复 npm config set registry https://registry.npmmirror.com/
#
npm login
# 先提交github，再发布npm
npm version patch
yarn build
npm publish
# https://www.npmjs.com/package/bytedesk-web
# 手动同步
# https://www.npmmirror.com/package/bytedesk-web
# 查看版本号
# pnpm view bytedesk-web versions
```
