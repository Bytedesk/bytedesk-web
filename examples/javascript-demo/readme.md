<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:45:03
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-31 15:43:41
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
-->
# bytedesk-web

Online customer service SDK, supporting multiple frameworks:

- [React Guide](examples/react-demo/readme.md)
- [Vue Guide](examples/vue-demo/readme.md)
- [Svelte Guide](examples/svelte-demo/readme.md)
- [JavaScript Guide](examples/javascript-demo/readme.md)

[中文文档](readme.zh.md)

## Installation Steps

### Install Dependencies

```bash
<!-- bytedesk.com -->
<script src="https://www.weiyuai.cn/embed/bytedesk-web.js"></script>
<script>
  const config = {
    placement: 'bottom-right',
    theme: {
      backgroundColor: '#0066FF',
      textColor: '#ffffff'
    },
    chatConfig: {
      org: 'df_org_uid',
      t: '2',
      sid: 'df_rt_uid'
    }
  };
  const bytedesk = new BytedeskWeb(config);
  bytedesk.init();
</script>  
```
