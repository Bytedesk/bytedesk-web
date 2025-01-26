<template>
  <div class="App" :style="styles.container">
    <h1 :style="{ fontSize: isMobile ? '20px' : '24px' }">Bytedesk Vue Demo</h1>

    <InstallGuide />

    <div :style="styles.grid">
      <!-- 左侧配置区域 -->
      <!-- 右侧预览和操作区域 -->
    </div>

    <BytedeskVue v-bind="config" @init="handleInit" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
// @ts-ignore
import { BytedeskVue } from '@bytedesk/web/adapters/vue';
// @ts-ignore
import type { BytedeskConfig, Position } from '@bytedesk/web/types';
import InstallGuide from './components/InstallGuide.vue';

// 添加导航栏预设颜色选项
const NAVBAR_PRESETS = {

  dark: {
    backgroundColor: '#333333',
    textColor: '#ffffff'
  },
  blue: {
    backgroundColor: '#0066FF',
    textColor: '#ffffff'
  },
  custom: {
    backgroundColor: '#ffffff',
    textColor: '#333333'
  }
};

export default defineComponent({
  name: 'App',
  components: {
    BytedeskVue,
    InstallGuide
  },
  setup() {
    // 添加 bytedeskInstance 引用
    const bytedeskInstance = ref<any>(null);

    // 从 URL 读取初始参数
    const getInitialChatParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      return {
        org: searchParams.get('org') || 'df_org_uid',
        t: searchParams.get('t') ? Number(searchParams.get('t')) : 2,
        sid: searchParams.get('sid') || 'df_rt_uid'
      };
    };

    // 获取默认配置
    const getDefaultConfig = () => ({
      preset: 'blue',
      placement: 'bottom-right' as Position,
      marginBottom: 20,
      marginSide: 20,
      tabsConfig: {
        home: false,
        messages: true,
        help: false,
        news: false
      },
      bubbleConfig: {
        show: true,
        icon: '👋',
        title: '需要帮助吗？',
        subtitle: '点击开始对话'
      },
      showSupport: true,
      chatConfig: getInitialChatParams(),
      theme: {
        textColor: '#ffffff',
        backgroundColor: '#2e88ff',
      }
    });

    // 状态管理
    const config = ref(getDefaultConfig());

    // 计算属性
    const isMobile = computed(() => window.innerWidth <= 768);

    // 样式算
    const styles = computed(() => ({
      container: {
        padding: isMobile.value ? '10px' : '20px',
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: isMobile.value ? '1fr' : '1fr 1fr',
        gap: isMobile.value ? '10px' : '20px',
        margin: isMobile.value ? '10px 0' : '20px 0'
      },
      section: {
        marginBottom: isMobile.value ? '10px' : '20px',
        padding: isMobile.value ? '10px' : '20px',
        border: '1px solid #ddd',
        borderRadius: '4px'
      }
    }));

    const rightSideStyles = computed(() => ({
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '20px'
    }));

    const chatButtonStyles = computed(() => ({
      backgroundColor: config.value.theme.backgroundColor,
      color: config.value.theme.textColor,
      border: 'none',
      borderRadius: '4px',
      padding: '10px 20px',
      cursor: 'pointer',
      width: '100%'
    }));

    // 处理函数
    const handleInit = (instance: any) => {
      console.log('BytedeskVue component initialized');
      bytedeskInstance.value = instance;  // 保存实例引用
    };

    const handleShowChat = () => {
      console.log('Show chat button clicked');
      if (bytedeskInstance.value) {
        console.log('Using stored bytedesk instance...');
        bytedeskInstance.value.showChat();
      } else {
        console.error('Bytedesk instance not found - waiting for initialization');
      }
    };

    const handlePlacementChange = (newPlacement: Position) => {
      config.value.placement = newPlacement;
    };

    const handleTabsChange = (tab: string, e: { target: HTMLInputElement }) => {
      config.value.tabsConfig[tab as keyof typeof config.value.tabsConfig] = e.target.checked;
    };

    const handleBubbleConfigChange = (key: string, value: any) => {
      // config.value.bubbleConfig[key as keyof typeof config.value.bubbleConfig] = value;
    };

    return {
      config,
      isMobile,
      styles,
      rightSideStyles,
      chatButtonStyles,
      bytedeskInstance,
      handleInit,
      handleShowChat,
      handlePlacementChange,
      handleTabsChange,
      handleBubbleConfigChange
    };
  }
});
</script>

<style>
.App {
  font-family: Arial, sans-serif;
}

.config-section {
  background-color: #ffffff;
}

button {
  transition: all 0.2s ease;
}

button:hover {
  opacity: 0.9;
}
</style> 