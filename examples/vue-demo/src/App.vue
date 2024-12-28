<template>
  <div class="App" :style="styles.container">
    <h1 :style="{ fontSize: isMobile ? '20px' : '24px' }">Bytedesk Vue Demo</h1>

    <div :style="styles.grid">
      <!-- 左侧配置区域 -->
      <div>
        <!-- 位置设置 -->
        <div class="config-section" :style="styles.section">
          <h3 :style="{ fontSize: isMobile ? '16px' : '18px' }">位置设置</h3>
          <div :style="{ 
            display: 'flex',
            gap: '10px',
            flexDirection: isMobile ? 'column' : 'row'
          }">
            <button
              @click="handlePlacementChange('bottom-left')"
              :style="{
                backgroundColor: config.placement === 'bottom-left' ? config.theme.primaryColor : '#fff',
                color: config.placement === 'bottom-left' ? '#fff' : '#333',
                border: '1px solid #ddd',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }"
            >
              左下角
            </button>
            <button
              @click="handlePlacementChange('bottom-right')"
              :style="{
                backgroundColor: config.placement === 'bottom-right' ? config.theme.primaryColor : '#fff',
                color: config.placement === 'bottom-right' ? '#fff' : '#333',
                border: '1px solid #ddd',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }"
            >
              右下角
            </button>
          </div>
        </div>

        <!-- 标签页设置 -->
        <div class="config-section" :style="styles.section">
          <h3 :style="{ fontSize: isMobile ? '16px' : '18px' }">标签页设置</h3>
          <div style="display: flex; flex-direction: column; gap: 10px">
            <label v-for="(enabled, tab) in config.tabsConfig" :key="tab" style="display: flex; align-items: center; gap: 8px">
              <input
                type="checkbox"
                :checked="enabled"
                @change="(e: Event) => handleTabsChange(tab, e)"
              />
              {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
            </label>
          </div>
        </div>

        <!-- 气泡消息设置 -->
        <div class="config-section" :style="styles.section">
          <h3 :style="{ fontSize: isMobile ? '16px' : '18px' }">气泡消息���置</h3>
          <div style="display: flex; flex-direction: column; gap: 10px">
            <label>
              <input
                type="checkbox"
                v-model="config.bubbleConfig.show"
                @change="(e) => handleBubbleConfigChange('show', e.target.checked)"
              />
              显示气泡消息
            </label>
            <input
              type="text"
              v-model="config.bubbleConfig.title"
              @input="(e) => handleBubbleConfigChange('title', e.target.value)"
              placeholder="气泡标题"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ddd"
            />
            <input
              type="text"
              v-model="config.bubbleConfig.subtitle"
              @input="(e) => handleBubbleConfigChange('subtitle', e.target.value)"
              placeholder="气泡副标题"
              style="padding: 8px; border-radius: 4px; border: 1px solid #ddd"
            />
          </div>
        </div>

        <!-- 其他配置区域... -->
      </div>

      <!-- 右侧预览和操作区域 -->
      <div :style="rightSideStyles">
        <button 
          @click="handleShowChat"
          :style="chatButtonStyles"
        >
          打开聊天
        </button>

        <!-- 当前配置显示 -->
        <div v-if="!isMobile" :style="{ ...styles.section, marginTop: '20px' }">
          <h3 :style="{ fontSize: isMobile ? '16px' : '18px' }">当前配置</h3>
          <pre :style="preStyles">{{ JSON.stringify(config, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <BytedeskVue v-bind="config" @init="handleInit" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { BytedeskVue } from '@bytedesk/web/adapters/vue';
import type { BytedeskConfig } from '@bytedesk/web/adapters/vue';
import { PRESET_COLORS, Position } from '@bytedesk/web/types';

// 添加导航栏预设颜色选项
const NAVBAR_PRESETS = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#333333'
  },
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
    BytedeskVue
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
      chatParams: getInitialChatParams(),
      theme: {
        primaryColor: '#2e88ff',
        secondaryColor: '#ffffff',
        textColor: '#333333',
        backgroundColor: '#ffffff',
        navbar: {
          backgroundColor: '#ffffff',
          textColor: '#333333'
        }
      }
    });

    // 状态管理
    const config = ref(getDefaultConfig());

    // 计算属性
    const isMobile = computed(() => window.innerWidth <= 768);

    // 样式��算
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

    const handleTabsChange = (tab: string, e: Event) => {
      const target = e.target as HTMLInputElement;
      config.value.tabsConfig[tab] = target.checked;
    };

    const handleBubbleConfigChange = (key: string, value: Event) => {
      if (key === 'show') {
        config.value.bubbleConfig[key] = (value.target as HTMLInputElement).checked;
      } else {
        config.value.bubbleConfig[key] = (value.target as HTMLInputElement).value;
      }
    };

    return {
      config,
      isMobile,
      styles,
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