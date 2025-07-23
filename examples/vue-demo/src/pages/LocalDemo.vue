<template>
  <div style="padding: 20px">
    <h1>微语基本设置</h1>
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

    <div style="margin-top: 20px; display: flex; gap: 10px; flex-wrap: wrap">
      <button
        @click="handleShowChat"
        class="action-button"
      >
        打开聊天
      </button>
      <button
        @click="handleShowChatWithParams"
        class="action-button"
      >
        带参数打开聊天
      </button>
      <button
        @click="handleHideChat"
        class="action-button"
      >
        关闭聊天
      </button>
      <button
        @click="handleShowButton"
        class="action-button"
      >
        显示按钮
      </button>
      <button
        @click="handleHideButton"
        class="action-button"
      >
        隐藏按钮
      </button>
      <button
        @click="handleShowBubble"
        class="action-button"
      >
        显示气泡
      </button>
      <button
        @click="handleHideBubble"
        class="action-button"
      >
        隐藏气泡
      </button>
      <button
        @click="handleShowInviteDialog"
        class="action-button"
      >
        显示邀请
      </button>
      <button
        @click="handleHideInviteDialog"
        class="action-button"
      >
        隐藏邀请
      </button>
    </div>

    <BytedeskVue v-bind="config" @init="handleInit" />

    <InstallGuide />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// @ts-ignore
import { BytedeskVue } from '@bytedesk/web/adapters/vue';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';
import InstallGuide from '../components/InstallGuide.vue';

export default defineComponent({
  name: 'LocalDemo',
  components: {
    BytedeskVue,
    InstallGuide
  },
  setup() {
    const bytedeskInstance = ref<any>(null);

    const config = ref<BytedeskConfig>({
      ...(process.env.NODE_ENV === 'development' ? { htmlUrl: 'http://127.0.0.1:9006' } : {}),
      placement: 'bottom-right',
      marginBottom: 20,
      marginSide: 20,
      autoPopup: false,
      draggable: true, // 是否可拖拽，默认不可拖拽
      // showSupport: true, // 是否显示微语技术支持，默认显示，付费功能，免费用户请勿使用
      inviteConfig: {
        show: false,
        delay: 1000, // 首次弹出延迟时间, 单位: 毫秒
        loop: true, // 是否启用循环
        loopDelay: 10000, // 循环间隔, 单位: 毫秒
        loopCount: 3, // 循环次数, 设置为0表示无限循环
      },
      bubbleConfig: {
        show: true,
        icon: '👋',
        title: '需要帮助吗？',
        subtitle: '点击开始对话'
      },
      buttonConfig: {
        show: true,
        width: 60,
        height: 60,
      },
      chatConfig: {
        org: 'df_org_uid',
        t: "2",
        sid: 'df_rt_uid',
        hello: 'hello' // 自定义任意参数
      },
      theme: {
        mode: 'light', // dark || light || system
      },
      locale: 'zh-cn',
    });

    const handleInit = (instance: any) => {
      console.log('BytedeskVue initialized');
      bytedeskInstance.value = instance;
    };

    const handleShowChat = () => {
      console.log("showChat");
      bytedeskInstance.value?.showChat();
    };

    const handleShowChatWithParams = () => {
      console.log("showChatWithParams");
      bytedeskInstance.value?.showChat({
        chatConfig: {
          org: 'df_org_uid',
          t: "1",
          sid: 'df_wg_uid'
        }
      });
    };

    const handleHideChat = () => {
      console.log("hideChat");
      bytedeskInstance.value?.hideChat();
    };

    const handleShowButton = () => {
      console.log("showButton");
      bytedeskInstance.value?.showButton();
    };

    const handleHideButton = () => {
      console.log("hideButton");
      bytedeskInstance.value?.hideButton();
    };

    const handleShowBubble = () => {
      console.log("showBubble");
      bytedeskInstance.value?.showBubble();
    };

    const handleHideBubble = () => {
      console.log("hideBubble");
      bytedeskInstance.value?.hideBubble();
    };

    const handleShowInviteDialog = () => {
      console.log("showInviteDialog");
      bytedeskInstance.value?.showInviteDialog();
    };

    const handleHideInviteDialog = () => {
      console.log("hideInviteDialog");
      bytedeskInstance.value?.hideInviteDialog();
    };

    return {
      config,
      bytedeskInstance,
      handleInit,
      handleShowChat,
      handleShowChatWithParams,
      handleHideChat,
      handleShowButton,
      handleHideButton,
      handleShowBubble,
      handleHideBubble,
      handleShowInviteDialog,
      handleHideInviteDialog
    };
  }
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
}
</style>
