<!-- unreadCountDemo.vue -->
<template>
  <div style="padding: 20px">
    <h1>微语未读消息计数示例</h1>
    <p>
      <a
        href="https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue"
        target="_blank"
        rel="noopener noreferrer"
        style="color: #2e88ff; text-decoration: none"
      >
        查看 Vue 集成文档
      </a>
    </p>

    <div style="
      margin-top: 20px; 
      margin-bottom: 20px; 
      padding: 20px; 
      background-color: #f5f5f5; 
      border-radius: 8px
    ">
      <h2>当前未读消息数: <span style="color: #ff4d4f">{{ unreadCount }}</span></h2>
    </div>

    <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap">
      <button
        @click="handleShowChat"
        class="action-button"
      >
        打开聊天
      </button>
      <button
        @click="handleClearUnread"
        class="action-button clear-button"
      >
        标记所有消息为已读
      </button>
      <button
        @click="handleRefreshUnread"
        class="action-button refresh-button"
      >
        刷新未读消息数
      </button>
    </div>

    <BytedeskVue v-bind="config" @init="handleInit" />

    <div style="margin-top: 40px">
      <h2>使用说明</h2>
      <ul style="line-height: 1.6">
        <li>使用 getUnreadMessageCount() 方法可以手动刷新未读消息数</li>
        <li>您可以使用 clearUnreadMessages() 方法手动重置未读消息数为0</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
// @ts-ignore
import { BytedeskVue } from '@bytedesk/web/adapters/vue';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';

export default defineComponent({
  name: 'UnreadCountDemo',
  components: {
    BytedeskVue
  },
  setup() {
    const unreadCount = ref<number>(0);
    const bytedeskInstance = ref<any>(null);

    const config = ref<BytedeskConfig>({
      ...(process.env.NODE_ENV === 'development' 
        ? { 
            htmlUrl: 'http://127.0.0.1:9006', 
            apiUrl: 'http://127.0.0.1:9003' 
          } 
        : {}),
      placement: 'bottom-right',
      marginBottom: 20,
      marginSide: 20,
      autoPopup: false,
      draggable: true,
      chatConfig: {
        org: 'df_org_uid',
        t: "1", // 0: 一对一对话；1：工作组对话；2：机器人对话
        sid: 'df_wg_uid',
        // 自定义用户信息
        visitorUid: 'visitor_001',
        nickname: '访客小明',
        avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
      },
      theme: {
        mode: 'light',
      },
      locale: 'zh-cn',
      // 添加 onVisitorInfo 回调
      onVisitorInfo: (uid: string, visitorUid: string) => {
        // uid 是系统自动生成访客uid，visitorUid 是前端自定义访客uid
        // 只有在打开对话窗口时，才会触发
        console.log('收到访客信息:', { uid, visitorUid });
      },
    });

    const handleInit = (instance: any) => {
      console.log('BytedeskVue initialized');
      bytedeskInstance.value = instance;
    };

    const handleShowChat = () => {
      bytedeskInstance.value?.showChat();
    };

    const handleClearUnread = () => {
      bytedeskInstance.value?.clearUnreadMessages().then((count: number) => {
        console.log('所有消息已标记为已读:', count);
        unreadCount.value = count; // 重置未读消息数
      });
    };

    const handleRefreshUnread = () => {
      bytedeskInstance.value?.getUnreadMessageCount().then((count: number) => {
        console.log('刷新后未读消息数：', count);
        unreadCount.value = count;
      });
    };

    onMounted(() => {
      // 默认初始化未读消息数
      (window as any).bytedesk?.getUnreadMessageCount().then((count: number) => {
        console.log('刷新后未读消息数：', count);
        unreadCount.value = count;
      });
    });

    onUnmounted(() => {
      // 组件卸载时清除监听器
      if ((window as any).bytedesk) {
        // (window as any).bytedesk.offUnreadCountChange();
      }
    });

    return {
      unreadCount,
      config,
      bytedeskInstance,
      handleInit,
      handleShowChat,
      handleClearUnread,
      handleRefreshUnread,
    };
  },
});
</script>

<style scoped>
.action-button {
  padding: 10px 20px;
  background-color: #2e88ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  opacity: 0.9;
}

.clear-button {
  background-color: #52c41a;
}

.refresh-button {
  background-color: #722ed1;
}
</style> 