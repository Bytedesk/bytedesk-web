<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 11:58:03
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-31 12:02:52
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
-->
<template>
  <div class="install-guide">
    <h2>安装步骤</h2>
    
    <div class="section">
      <h3>1. 安装依赖</h3>
      <pre><code>npm install bytedesk-web
# 或
yarn add bytedesk-web</code></pre>
    </div>

    <div class="section">
      <h3>2. 导入组件</h3>
      <pre><code>import { BytedeskVue } from 'bytedesk-web/vue';
import type { BytedeskConfig } from 'bytedesk-web/vue';</code></pre>
    </div>

    <div class="section">
      <h3>3. 配置参数</h3>
      <pre><code>const config = ref&lt;BytedeskConfig&gt;({
  baseUrl: 'https://ai.bytedesk.com',
  placement: 'bottom-right',
  marginBottom: 20,
  marginSide: 20,
  chatParams: {
    org: 'your_org_id',  // 替换为您的组织ID
    t: "2",
    sid: 'your_sid'      // 替换为您的SID
  }
});</code></pre>
    </div>

    <div class="section">
      <h3>4. 使用组件</h3>
      <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;BytedeskVue v-bind="config" @init="handleInit" /&gt;
    &lt;button @click="handleShowChat"&gt;打开聊天&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
const bytedeskInstance = ref(null);

const handleInit = (instance) => {
  bytedeskInstance.value = instance;
};

const handleShowChat = () => {
  bytedeskInstance.value?.showChat();
};
&lt;/script&gt;</code></pre>
    </div>

    <div class="section">
      <h3>5. 可用方法</h3>
      <ul>
        <li><code>bytedeskInstance.value?.showChat()</code> - 显示聊天窗口</li>
        <li><code>bytedeskInstance.value?.hideChat()</code> - 隐藏聊天窗口</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.install-guide {
  margin-top: 40px;
  max-width: 800px;
}

.section {
  margin-bottom: 20px;
}

pre {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: monospace;
}

ul {
  line-height: 1.6;
}
</style> 