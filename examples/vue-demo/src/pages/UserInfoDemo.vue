<template>
  <div style="height: 100%; overflow-y: auto; box-sizing: border-box; background: transparent">
    <div style="padding: 24px; background: transparent; border-radius: 8px">
      <h2>用户信息对接演示</h2>
      <p>
        本示例演示如何通过配置参数传入用户信息（uid、nickname、avatar）到客服组件中。
        点击下方按钮可以切换不同的用户信息。
        <br />
        <a
          href="https://www.weiyuai.cn/docs/zh-CN/docs/development/userinfo"
          target="_blank"
          rel="noopener noreferrer"
          style="color: #2e88ff"
        >
          查看用户信息对接文档
        </a>
      </p>

      <div class="card">
        <div class="vertical-space">
          <h3>当前用户信息：</h3>
          <div class="user-info">
            <img :src="currentUser.avatar" alt="用户头像" class="avatar" />
            <div>
              <p>用户ID: {{ currentUser.visitorUid }}</p>
              <p>昵称: {{ currentUser.nickname }}</p>
            </div>
          </div>
        </div>

        <div class="button-group">
          <button
            class="primary-button"
            @click="handleSwitchUser(testUsers[0])"
            :disabled="currentUser.visitorUid === testUsers[0].visitorUid"
          >
            切换到访客小明
          </button>
          <button
            class="primary-button"
            @click="handleSwitchUser(testUsers[1])"
            :disabled="currentUser.visitorUid === testUsers[1].visitorUid"
          >
            切换到访客小红
          </button>
        </div>
        <div class="center-button">
          <button class="large-button" @click="handleShowChat">
            咨询客服
          </button>
        </div>
      </div>

      <div class="card">
        <h3>微语 接口控制面板</h3>
        <hr />
        <div class="control-grid">
          <div class="control-card">
            <h4>聊天窗口控制</h4>
            <div class="vertical-space">
              <div class="button-group">
                <button @click="handleShowChat">显示聊天窗口</button>
                <button @click="handleHideChat">隐藏聊天窗口</button>
              </div>
              <p class="note">
                调用代码：bytedesk.showChat() / bytedesk.hideChat()
              </p>
            </div>
          </div>
          <div class="control-card">
            <h4>按钮控制</h4>
            <div class="vertical-space">
              <div class="button-group">
                <button @click="handleShowButton">显示按钮</button>
                <button @click="handleHideButton">隐藏按钮</button>
              </div>
              <p class="note">
                调用代码：bytedesk.showButton() / bytedesk.hideButton()
              </p>
            </div>
          </div>
          <div class="control-card">
            <h4>气泡消息控制</h4>
            <div class="vertical-space">
              <div class="button-group">
                <button @click="handleShowBubble">显示气泡</button>
                <button @click="handleHideBubble">隐藏气泡</button>
              </div>
              <p class="note">
                调用代码：bytedesk.showBubble() / bytedesk.hideBubble()
              </p>
            </div>
          </div>
          <div class="control-card">
            <h4>邀请对话框控制</h4>
            <div class="vertical-space">
              <div class="button-group">
                <button @click="handleShowInviteDialog">显示邀请对话框</button>
                <button @click="handleHideInviteDialog">隐藏邀请对话框</button>
              </div>
              <p class="note">
                调用代码：bytedesk.showInviteDialog() / bytedesk.hideInviteDialog()
              </p>
            </div>
          </div>
        </div>
      </div>

      <BytedeskVue v-bind="config" @init="handleInit" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue';
// @ts-ignore
import { BytedeskVue } from '@bytedesk/web/adapters/vue';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';

// 定义用户信息接口
interface UserInfo {
  visitorUid: string;
  nickname: string;
  avatar: string;
}

export default defineComponent({
  name: 'UserInfoDemo',
  components: {
    BytedeskVue
  },
  setup() {
    // 定义测试用户
    const testUsers = reactive<UserInfo[]>([
      {
        visitorUid: 'visitor_001',
        nickname: '访客小明',
        avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg'
      },
      {
        visitorUid: 'visitor_002',
        nickname: '访客小红',
        avatar: 'https://weiyuai.cn/assets/images/avatar/01.jpg'
      }
    ]);

    // 当前选中的用户信息
    const currentUser = ref<UserInfo>(testUsers[0]);
    const bytedeskInstance = ref<any>(null);

    // 配置客服组件
    const config = ref<BytedeskConfig>({
      ...(process.env.NODE_ENV === 'development' ? { htmlUrl: 'http://127.0.0.1:9006' } : {}),
      placement: 'bottom-right',
      autoPopup: false,
      forceRefresh: true,
      inviteConfig: {
        show: false,
        text: '您好，请问有什么可以帮您？',
      },
      marginBottom: 20,
      marginSide: 20,
      buttonConfig: {
        show: false,
      },
      bubbleConfig: {
        show: false,
        icon: '👋',
        title: '需要帮助吗？',
        subtitle: '点击与客服对话'
      },
      chatConfig: {
        org: 'df_org_uid',
        t: "1",
        sid: 'df_wg_uid',
        // 传入用户信息
        visitorUid: currentUser.value.visitorUid,
        nickname: currentUser.value.nickname,
        avatar: currentUser.value.avatar,
        mobile: '13800138000',
        email: 'test@test.com',
        note: 'test',
        // 自定义字段，可以传递任何字段
        extra: JSON.stringify({
          type: 'type',
          test: 'test'
        })
      },
      locale: 'zh-cn',
    });

    // 监听用户变化，更新配置
    watch(currentUser, (newUser) => {
      config.value = {
        ...config.value,
        forceRefresh: true,
        chatConfig: {
          ...config.value.chatConfig,
          visitorUid: newUser.visitorUid,
          nickname: newUser.nickname,
          avatar: newUser.avatar
        }
      };
    });

    // 切换用户信息
    const handleSwitchUser = (user: UserInfo) => {
      currentUser.value = user;
    };

    const handleInit = (instance: any) => {
      console.log('BytedeskVue initialized');
      bytedeskInstance.value = instance;
    };

    // Bytedesk 接口控制函数
    const handleShowChat = () => {
      console.log("showChat");
      bytedeskInstance.value?.showChat();
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
      testUsers,
      currentUser,
      config,
      bytedeskInstance,
      handleInit,
      handleSwitchUser,
      handleShowChat,
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
.card {
  margin-top: 20px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
}

.vertical-space {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.primary-button {
  padding: 8px 16px;
  background-color: #2e88ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.center-button {
  text-align: center;
  margin-top: 16px;
}

.large-button {
  padding: 12px 24px;
  background-color: #2e88ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.control-card {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
  margin-top: 10px;
}

.note {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

button {
  padding: 8px 16px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #e0e0e0;
}
</style>
