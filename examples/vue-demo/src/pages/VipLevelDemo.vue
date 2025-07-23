<template>
  <div style="height: 100%; overflow-y: auto; box-sizing: border-box; background: transparent">
    <div style="padding: 24px; background: transparent; border-radius: 8px">
      <h2>VIP等级对接演示</h2>
      <p>
        本示例演示如何通过配置参数传入用户VIP等级（vipLevel）到客服组件中。
        点击下方按钮可以切换不同VIP等级的用户信息。
        <br />
        <a
          href="https://www.weiyuai.cn/docs/zh-CN/docs/development/viplevel"
          target="_blank"
          rel="noopener noreferrer"
          style="color: #2e88ff"
        >
          查看VIP等级对接文档
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
              <p>
                VIP等级: 
                <span class="vip-tag" :class="getVipLevelClass(currentUser.vipLevel)">
                  {{ currentUser.vipLevel === 0 ? '普通用户' : `VIP${currentUser.vipLevel}` }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="button-group">
          <button
            v-for="user in testUsers"
            :key="user.visitorUid"
            class="primary-button"
            @click="handleSwitchUser(user)"
            :disabled="currentUser.visitorUid === user.visitorUid"
          >
            切换到{{ user.nickname }}
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
  vipLevel: number;
}

export default defineComponent({
  name: 'VipLevelDemo',
  components: {
    BytedeskVue
  },
  setup() {
    // 定义测试用户，包含不同的VIP等级
    const testUsers = reactive<UserInfo[]>([
      {
        visitorUid: 'visitor_001',
        nickname: '普通用户',
        avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
        vipLevel: 0
      },
      {
        visitorUid: 'visitor_002',
        nickname: 'VIP1用户',
        avatar: 'https://weiyuai.cn/assets/images/avatar/01.jpg',
        vipLevel: 1
      },
      {
        visitorUid: 'visitor_003',
        nickname: 'VIP2用户',
        avatar: 'https://weiyuai.cn/assets/images/avatar/03.jpg',
        vipLevel: 2
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
        // 传入用户信息，包含vipLevel
        visitorUid: currentUser.value.visitorUid,
        nickname: currentUser.value.nickname,
        avatar: currentUser.value.avatar,
        vipLevel: currentUser.value.vipLevel,
        // 自定义字段
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
          avatar: newUser.avatar,
          vipLevel: newUser.vipLevel
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

    // 获取VIP等级标签颜色
    const getVipLevelClass = (level: number): string => {
      switch (level) {
        case 0:
          return 'vip-default';
        case 1:
          return 'vip-blue';
        case 2:
          return 'vip-gold';
        default:
          return 'vip-default';
      }
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
      getVipLevelClass
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
  margin-bottom: 20px;
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

.vip-tag {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 8px;
}

.vip-default {
  background-color: #f0f0f0;
  color: #666;
}

.vip-blue {
  background-color: #1890ff;
  color: white;
}

.vip-gold {
  background-color: #faad14;
  color: white;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
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
