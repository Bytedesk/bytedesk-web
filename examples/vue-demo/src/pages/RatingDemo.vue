<!--
 * @Description: Rating Demo - replicates react-demo RatingDemo
-->
<template>
  <PageContainer>
    <div class="card">
      <h2>{{ ratingMessages.title }}</h2>
      <p class="desc">{{ ratingMessages.description }}</p>
    </div>

    <div class="card">
      <h3>{{ ratingMessages.routeTableTitle }}</h3>
      <table class="route-table">
        <thead>
          <tr>
            <th>{{ ratingMessages.routeTable.routeLabel }}</th>
            <th>{{ ratingMessages.routeTable.purposeLabel }}</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in routeTableRows" :key="row.key">
            <td><code>/chat?{{ row.route }}</code></td>
            <td>{{ row.purpose }}</td>
            <td><button class="btn" @click="selectedScenario = row.key; showRatingWindow()">{{ row.label }}</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <h3>URL 参数说明</h3>
      <table class="route-table">
        <thead>
          <tr><th>参数</th><th>值</th><th>说明</th></tr>
        </thead>
        <tbody>
          <tr v-for="row in urlParamRows" :key="row.param">
            <td><code>{{ row.param }}</code></td>
            <td><code>{{ row.value }}</code></td>
            <td>{{ row.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <h3>嵌入代码示例</h3>
      <pre><code>{{ embedCode }}</code></pre>
      <button class="btn primary" @click="copyEmbedCode">{{ embedCopyText }}</button>
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
import type { DemoUserKey, DemoUserProfile } from '../types/demo-user';
import type { DemoChatProfile } from '../types/chat-profile';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';
import { buildUrlParamRowsWithEncodeHint } from '../utils/url-param-guide';
import { buildCurrentEmbedCodeExample, getCurrentEmbedCodeCopy } from '../utils/embed-code-guide';

interface Props {
  locale: Language;
  themeMode: string;
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
}

const props = defineProps<Props>();

type RatingScenarioKey = 'chat' | 'pending' | 'followup';
const selectedScenario = ref<RatingScenarioKey>('chat');

const messages = computed(() => getLocaleMessages(props.locale));
const ratingMessages = computed(() => messages.value.pages.ratingDemo);
const htmlBaseUrl = getDemoHtmlBaseUrl(9006);

const scenarioParams: Record<RatingScenarioKey, string> = {
  chat: 'rating=chat',
  pending: 'rating=pending',
  followup: 'rating=followup',
};

const routeTableRows = computed(() => [
  { key: 'chat' as RatingScenarioKey, route: `org=${props.selectedChatProfile.chatConfig.org}&t=${props.selectedChatProfile.chatConfig.t}&sid=${props.selectedChatProfile.chatConfig.sid}&${scenarioParams.chat}`, label: '正常对话评分', purpose: '对话结束后评价' },
  { key: 'pending' as RatingScenarioKey, route: `org=${props.selectedChatProfile.chatConfig.org}&t=${props.selectedChatProfile.chatConfig.t}&sid=${props.selectedChatProfile.chatConfig.sid}&${scenarioParams.pending}`, label: '待评价历史会话', purpose: '查看待评价会话' },
  { key: 'followup' as RatingScenarioKey, route: `org=${props.selectedChatProfile.chatConfig.org}&t=${props.selectedChatProfile.chatConfig.t}&sid=${props.selectedChatProfile.chatConfig.sid}&${scenarioParams.followup}`, label: '支持追评', purpose: '支持追加评价' },
]);

const urlParamRows = computed(() => buildUrlParamRowsWithEncodeHint(
  `org=${props.selectedChatProfile.chatConfig.org}&t=${props.selectedChatProfile.chatConfig.t}&sid=${props.selectedChatProfile.chatConfig.sid}&${scenarioParams[selectedScenario.value]}`,
  props.locale
));

const config = computed<BytedeskConfig>(() => ({
  isDebug: true,
  htmlUrl: htmlBaseUrl,
  ...(demoApiUrl ? { apiUrl: demoApiUrl } : {}),
  placement: 'bottom-right',
  marginBottom: 20,
  marginSide: 20,
  autoPopup: false,
  draggable: true,
  bubbleConfig: { show: true, icon: '⭐', title: '满意度评价', subtitle: '点击评价服务' },
  buttonConfig: { show: true, action: 'chat' },
  chatConfig: {
    ...props.selectedChatProfile.chatConfig,
    threadDetail: '1',
    visitorProfile: '1',
    ...(props.isAnonymousMode ? {} : {
      visitorUid: props.selectedUser.visitorUid,
      nickname: props.selectedUser.nickname,
      avatar: props.selectedUser.avatar,
    }),
  },
  theme: { mode: props.themeMode as any },
  locale: props.locale,
}));

const embedCode = computed(() => buildCurrentEmbedCodeExample(config.value, props.locale).code);
const embedCopyText = computed(() => getCurrentEmbedCodeCopy(props.locale));

function showRatingWindow() {
  (window as any).bytedesk?.showChat();
}

function copyEmbedCode() {
  navigator.clipboard.writeText(embedCode.value);
  alert(embedCopyText.value);
}
</script>

<style scoped>
.card { background: #fff; border-radius: 8px; padding: 24px; margin-bottom: 16px; }
.desc { color: #666; margin-top: 8px; }
.route-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
.route-table th, .route-table td { border: 1px solid #e8e8e8; padding: 8px 12px; text-align: left; font-size: 13px; }
.route-table th { background: #fafafa; }
.btn { padding: 6px 16px; border: 1px solid #d9d9d9; border-radius: 6px; background: #fff; cursor: pointer; font-size: 13px; }
.btn.primary { background: #1677ff; color: #fff; border-color: #1677ff; }
pre { background: #f6f8fa; padding: 12px; border-radius: 6px; overflow-x: auto; font-size: 12px; margin: 8px 0; }
code { font-family: monospace; }
</style>
