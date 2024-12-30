/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 13:04:24
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-30 13:17:18
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
const express = require('express');
const path = require('path');
const app = express();
const port = 9024;

// 设置正确的 MIME 类型
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

// 静态文件服务
app.use(express.static('public'));
// 为 UMD 文件提供服务，使用绝对路径
app.use('/dist', express.static(path.resolve(__dirname, '../../dist'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 