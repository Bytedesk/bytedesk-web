<!--
 * @Description: Proactive Demo for Vue
-->
<template>
  <PageContainer>
    <div class="card">
      <h2>主动会话工作流演示</h2>
      <p class="desc">演示主动发起会话工作流（线索收集等场景），使用 workflow 类型 (t=17)</p>
    </div>

    <div class="card">
      <h3>URL 参数</h3>
      <table class="route-table">
        <thead><tr><th>参数</th><th>值</th><th>说明</th></tr></thead>
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
      <div class="controls">
        <button class="btn primary" @click="showProactiveEmbed">嵌入方式打开</button>
        <button class="btn" @click="showProactivePopup">弹窗方式打开</button>
      </div>
    </div>

    <BytedeskVue v-bind="embedConfig" />
  </PageContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// @ts-ignore
import { BytedeskVue } from '@bytedesk/web/adapters/vue';
// @ts-ignore
import type { BytedeskConfig, Language } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer.vue';
import type { DemoUserProfile } from '../types/demo-user';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';
import { buildUrlParamRowsWithEncodeHint } from '../utils/url-param-guide';

interface Props {
  locale: Language;
  themeMode: string;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
}

const props = defineProps<Props>();
const messages = computed(() => getLocaleMessages(props.locale));
const htmlBaseUrl = getDemoHtmlBaseUrl(9006);

const workflowOrgUid = 'df_org_uid';
const workflowSid = 'df_wf_uid';

const urlParamRows = computed(() => buildUrlParamRowsWithEncodeHint(
  `org=${workflowOrgUid}&t=17&sid=${workflowSid}`,
  props.locale
));

const embedConfig = computed<BytedeskConfig>(() => ({
  isDebug: true,
  htmlUrl: htmlBaseUrl,
  ...(demoApiUrl ? { apiUrl: demoApiUrl } : {}),
  placement: 'bottom-right',
  marginBottom: 20,
  marginSide: 20,
  autoPopup: false,
  draggable: true,
  bubbleConfig: { show: true, icon: '📋', title: '线索收集', subtitle: '点击填写信息' },
  buttonConfig: { show: true, action: 'chat' },
  chatConfig: {
    org: workflowOrgUid,
    t: '17',
    sid: workflowSid,
    ...(props.isAnonymousMode ? {} : {
      visitorUid: props.selectedUser.visitorUid,
      nickname: props.selectedUser.nickname,
      avatar: props.selectedUser.avatar,
    }),
  },
  theme: { mode: props.themeMode as any },
  locale: props.locale,
}));

function showProactiveEmbed() {
  (window as any).bytedesk?.showChat();
}

function showProactivePopup() {
  const params = new URLSearchParams();
  params.append('org', workflowOrgUid);
  params.append('t', '17');
  params.append('sid', workflowSid);
  window.open(`${htmlBaseUrl}/chat?${params.toString()}`, '_blank', 'width=420,height=680');
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
.controls { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
code { background: #f6f8fa; padding: 1px 6px; border-radius: 3px; font-size: 12px; }
</style>
