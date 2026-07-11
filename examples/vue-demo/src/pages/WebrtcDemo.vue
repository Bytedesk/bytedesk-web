<!--
 * @Description: WebRTC Demo for Vue
-->
<template>
  <PageContainer>
    <div class="card">
      <h2>WebRTC 音视频通话演示</h2>
      <p class="desc">演示 WebRTC 音视频通话功能，使用 /webrtc 路径</p>
    </div>

    <div class="card">
      <div class="controls">
        <label class="radio-label">
          <input type="radio" v-model="callMode" value="audio" /> 音频通话
        </label>
        <label class="radio-label">
          <input type="radio" v-model="callMode" value="video" /> 视频通话
        </label>
      </div>
      <div class="controls" style="margin-top: 12px">
        <button class="btn primary" @click="showWebrtc">打开 WebRTC {{ callMode === 'audio' ? '音频' : '视频' }}通话</button>
      </div>
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
import type { DemoUserProfile } from '../types/demo-user';
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
const callMode = ref<'audio' | 'video'>('audio');

const messages = computed(() => getLocaleMessages(props.locale));
const htmlBaseUrl = getDemoHtmlBaseUrl(9006);

const urlParamRows = computed(() => buildUrlParamRowsWithEncodeHint(
  `org=${props.selectedChatProfile.chatConfig.org}&t=${props.selectedChatProfile.chatConfig.t}&sid=${props.selectedChatProfile.chatConfig.sid}&callMode=${callMode.value}`,
  props.locale
));

const config = computed<BytedeskConfig>(() => ({
  isDebug: true,
  htmlUrl: htmlBaseUrl,
  ...(demoApiUrl ? { apiUrl: demoApiUrl } : {}),
  chatPath: '/webrtc',
  placement: 'bottom-right',
  marginBottom: 20,
  marginSide: 20,
  autoPopup: false,
  draggable: true,
  bubbleConfig: { show: true, icon: '📹', title: 'WebRTC通话', subtitle: '点击开始音视频通话' },
  buttonConfig: { show: true, action: 'chat' },
  chatConfig: {
    ...props.selectedChatProfile.chatConfig,
    callMode: callMode.value,
    ...(props.isAnonymousMode ? {} : {
      visitorUid: props.selectedUser.visitorUid,
      nickname: props.selectedUser.nickname,
      avatar: props.selectedUser.avatar,
    }),
  },
  theme: { mode: props.themeMode as any },
  locale: props.locale,
}));

function showWebrtc() {
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
.controls { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.radio-label { font-size: 13px; display: flex; align-items: center; gap: 4px; cursor: pointer; }
code { background: #f6f8fa; padding: 1px 6px; border-radius: 3px; font-size: 12px; }
</style>
