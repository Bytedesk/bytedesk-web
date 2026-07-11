<!--
 * @Description: Ticket Demo - replicates react-demo TicketDemo
-->
<template>
  <PageContainer>
    <div class="card">
      <h2>{{ messages.pages.ticketDemo.title }}</h2>
      <p class="desc">{{ messages.pages.ticketDemo.description }}</p>
    </div>

    <div class="card">
      <h3>{{ messages.pages.ticketDemo.routeTableTitle }}</h3>
      <table class="route-table">
        <thead>
          <tr>
            <th>{{ messages.pages.ticketDemo.routeTable.routeLabel }}</th>
            <th>{{ messages.pages.ticketDemo.routeTable.purposeLabel }}</th>
            <th>{{ messages.pages.ticketDemo.routeTable.actionLabel }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in routeTableRows" :key="row.key">
            <td><code>/chat?{{ row.route }}</code></td>
            <td>{{ row.purpose }}</td>
            <td><button class="btn" @click="selectedScenario = row.key">{{ row.label }}</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="alert info" v-if="!isTicketSupported">
        {{ ticketSupportNotice }}
      </div>
      <div class="controls">
        <button class="btn primary" @click="showTicketWindow">
          {{ openScenarioLabel }}
        </button>
        <label class="checkbox-label">
          <input type="checkbox" v-model="ticketHeaderVisible" />
          {{ ticketHeaderToggleLabel }}
        </label>
      </div>
    </div>

    <div class="card">
      <h3>URL {{ messages.pages.threadHistoryDemo.paramTableTitle }}</h3>
      <table class="route-table">
        <thead>
          <tr>
            <th>参数</th>
            <th>值</th>
            <th>说明</th>
          </tr>
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

interface Props {
  locale: Language;
  themeMode: string;
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  selectUser: [key: DemoUserKey];
  anonymousModeChange: [mode: boolean];
}>();

type TicketScenarioKey = 'history' | 'create' | 'notifications';
const selectedScenario = ref<TicketScenarioKey>('history');
const ticketHeaderVisible = ref(true);

const messages = computed(() => getLocaleMessages(props.locale));
const htmlBaseUrl = getDemoHtmlBaseUrl(9017);

const isTicketSupported = computed(() => props.selectedChatProfile.key === 'workgroup');

const ticketSupportNotice = computed(() => {
  const map: Record<string, string> = { 'zh-cn': '仅工作组时支持工单', en: 'Tickets are supported only in workgroup mode' };
  return map[props.locale] || map['en'];
});

const openScenarioLabel = computed(() => {
  const map: Record<string, Record<TicketScenarioKey, string>> = {
    'zh-cn': { history: '打开历史工单窗口', create: '打开工单提交窗口', notifications: '打开通知消息提醒窗口' },
    en: { history: 'Open history tickets', create: 'Open create ticket', notifications: 'Open notifications' },
  };
  return (map[props.locale] || map['en'])[selectedScenario.value];
});

const ticketHeaderToggleLabel = computed(() => {
  return ticketHeaderVisible.value ? '隐藏 TicketHeader' : '显示 TicketHeader';
});

const scenarioParams: Record<TicketScenarioKey, string> = {
  history: 'ticket=history',
  create: 'ticket=create',
  notifications: 'ticket=notifications',
};

const routeTableRows = computed(() => [
  { key: 'history' as TicketScenarioKey, route: scenarioParams.history, label: openScenarioLabel.value, purpose: '查看历史工单' },
  { key: 'create' as TicketScenarioKey, route: scenarioParams.create, label: openScenarioLabel.value, purpose: '提交新工单' },
  { key: 'notifications' as TicketScenarioKey, route: scenarioParams.notifications, label: openScenarioLabel.value, purpose: '通知消息提醒' },
]);

const urlParamRows = computed(() => buildUrlParamRowsWithEncodeHint(
  `org=${props.selectedChatProfile.chatConfig.org}&t=${props.selectedChatProfile.chatConfig.t}&sid=${props.selectedChatProfile.chatConfig.sid}&ticket=${selectedScenario.value}`,
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
  bubbleConfig: { show: true, icon: '🎫', title: '工单', subtitle: '点击查看工单' },
  buttonConfig: { show: true, action: 'chat' },
  chatConfig: {
    ...props.selectedChatProfile.chatConfig,
    ticketHeader: ticketHeaderVisible.value ? '1' : '0',
    ...(props.isAnonymousMode ? {} : {
      visitorUid: props.selectedUser.visitorUid,
      nickname: props.selectedUser.nickname,
      avatar: props.selectedUser.avatar,
    }),
  },
  theme: { mode: props.themeMode as any },
  locale: props.locale,
}));

function showTicketWindow() {
  (window as any).bytedesk?.showChat();
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
.alert { padding: 12px; border-radius: 6px; margin-bottom: 12px; }
.alert.info { background: #e6f4ff; color: #1677ff; }
.controls { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.checkbox-label { font-size: 13px; display: flex; align-items: center; gap: 4px; cursor: pointer; }
</style>
