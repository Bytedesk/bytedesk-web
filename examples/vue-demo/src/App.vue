<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:41:39
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-06-21 10:28:50
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
-->
<template>
  <div class="App">
    <nav class="nav">
      <router-link to="/" class="nav-link">基本配置</router-link>
      <router-link to="/userInfo" class="nav-link">用户信息对接</router-link>
      <router-link to="/goodsInfo" class="nav-link">商品信息对接</router-link>
      <router-link to="/orderInfo" class="nav-link">订单信息对接</router-link>
      <router-link to="/vipLevel" class="nav-link">千人千面对接</router-link>
      <router-link to="/unreadCount" class="nav-link">未读消息数对接</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>

<style>
.App {
  font-family: Arial, sans-serif;
}

.nav {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.nav-link {
  margin-right: 20px;
  text-decoration: none;
  color: #333;
}

.nav-link:hover {
  color: #2e88ff;
}

.nav-link.router-link-active {
  color: #2e88ff;
  font-weight: bold;
}

button {
  transition: all 0.2s ease;
}

button:hover {
  opacity: 0.9;
}
</style>