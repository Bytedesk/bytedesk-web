<!--
 * @Description: Document Feedback Demo for Vue
-->
<template>
  <PageContainer>
    <div class="card">
      <h2>文档反馈演示</h2>
      <p class="desc">演示文本选中触发文档反馈功能</p>
    </div>

    <div class="card">
      <div class="feedback-area">
        <h3>请选中以下文字试试反馈功能：</h3>
        <p class="selectable-text">
          这是一段示例文本。当你在网页上选中文字时，可以触发文档反馈功能，方便用户对文档内容进行反馈和建议。
          Bytedesk 提供了便捷的文档反馈接口，只需简单配置即可集成到你的网站或应用中。
        </p>
      </div>
    </div>

    <div class="card">
      <h3>反馈配置参数</h3>
      <table class="route-table">
        <thead><tr><th>参数</th><th>说明</th></tr></thead>
        <tbody>
          <tr><td><code>feedbackConfig.enabled</code></td><td>是否启用文档反馈</td></tr>
          <tr><td><code>feedbackConfig.category</code></td><td>反馈类别（可选）</td></tr>
          <tr><td><code>feedbackConfig.onSelect</code></td><td>文本选中回调</td></tr>
        </tbody>
      </table>
    </div>

    <div class="card" v-if="feedbackLogs.length > 0">
      <h3>反馈日志</h3>
      <div v-for="(log, i) in feedbackLogs" :key="i" class="log-item">
        {{ log }}
      </div>
    </div>

    <BytedeskVue v-bind="config" />
  </PageContainer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
// @ts-ignore
import { BytedeskVue } from '@bytedesk/web/adapters/vue';
// @ts-ignore
import type { BytedeskConfig, Language } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer.vue';
import type { DemoChatProfile } from '../types/chat-profile';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';

interface Props {
  locale: Language;
  themeMode: string;
  selectedChatProfile: DemoChatProfile;
}

const props = defineProps<Props>();
const feedbackLogs = ref<string[]>([]);

const messages = computed(() => getLocaleMessages(props.locale));
const htmlBaseUrl = getDemoHtmlBaseUrl(9006);

const config = computed<BytedeskConfig>(() => ({
  isDebug: true,
  htmlUrl: htmlBaseUrl,
  ...(demoApiUrl ? { apiUrl: demoApiUrl } : {}),
  placement: 'bottom-right',
  marginBottom: 20,
  marginSide: 20,
  autoPopup: false,
  bubbleConfig: { show: true, icon: '📝', title: '文档反馈', subtitle: '选中文字反馈' },
  buttonConfig: { show: true, action: 'chat' },
  chatConfig: {
    ...props.selectedChatProfile.chatConfig,
  },
  feedbackConfig: {
    enabled: true,
    onSelect: (selectedText: string) => {
      const timestamp = new Date().toLocaleTimeString();
      feedbackLogs.value.push(`[${timestamp}] 选中文字: "${selectedText.substring(0, 50)}${selectedText.length > 50 ? '...' : ''}"`);
    },
  },
  theme: { mode: props.themeMode as any },
  locale: props.locale,
}));
</script>

<style scoped>
.card { background: #fff; border-radius: 8px; padding: 24px; margin-bottom: 16px; }
.desc { color: #666; margin-top: 8px; }
.route-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
.route-table th, .route-table td { border: 1px solid #e8e8e8; padding: 8px 12px; text-align: left; font-size: 13px; }
.route-table th { background: #fafafa; }
.feedback-area { padding: 16px; background: #f9f9f9; border-radius: 6px; }
.selectable-text { margin-top: 12px; line-height: 1.8; color: #333; user-select: text; cursor: text; }
.log-item { padding: 6px; border-bottom: 1px solid #f0f0f0; font-size: 12px; color: #666; font-family: monospace; }
code { background: #f6f8fa; padding: 1px 6px; border-radius: 3px; font-size: 12px; }
</style>
