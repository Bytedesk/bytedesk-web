<!--
 * @Description: Platform Demo - replicates react-demo PlatformDemo
-->
<template>
  <PageContainer>
    <div class="card">
      <h2>{{ platformMessages.title }}</h2>
      <p class="desc">{{ platformMessages.description }}</p>
    </div>

    <div class="card">
      <div class="controls">
        <strong>当前路径：</strong>
        <span class="tag">/chat</span>
        <span class="hint">默认聊天路径</span>
      </div>
      <div class="alert info">
        <strong>平台/店铺客服说明：</strong>
        <p>使用默认组织 <code>orgUid=df_org_uid</code> 作为平台客服，其余 orgUid 都视为店铺客服，并且每个组织支持设置多个咨询入口：售前客服、售后客服等</p>
      </div>
    </div>

    <div class="card">
      <h3>{{ platformMessages.routeTableTitle }}</h3>
      <table class="route-table">
        <thead>
          <tr>
            <th>{{ platformMessages.routeTable.routeLabel }}</th>
            <th>{{ platformMessages.routeTable.purposeLabel }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in routeTableRows" :key="row.key">
            <td><code>{{ row.route }}</code></td>
            <td>{{ row.purpose }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card">
      <h3>使用说明</h3>
      <ul class="usage-list">
        <li>平台客服 (orgUid=df_org_uid) — 默认的平台级客服</li>
        <li>店铺客服 — 使用其他 orgUid 实现店铺独立客服</li>
        <li>每个组织支持设置多个咨询入口：售前客服、售后客服等</li>
      </ul>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// @ts-ignore
import type { Language } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer.vue';
import type { DemoUserKey, DemoUserProfile } from '../types/demo-user';
import type { DemoChatProfile } from '../types/chat-profile';

interface Props {
  locale: Language;
  themeMode: string;
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
}

const props = defineProps<Props>();

const messages = computed(() => getLocaleMessages(props.locale));
const platformMessages = computed(() => messages.value.pages.platformDemo);

type PlatformScenarioKey = 'platform' | 'presales' | 'aftersales';

const routeTableRows = computed(() => {
  const rows = platformMessages.value.routeRows;
  return [
    { key: 'platform' as PlatformScenarioKey, route: rows.platform.example, purpose: rows.platform.purpose },
    { key: 'presales' as PlatformScenarioKey, route: rows.presales.example, purpose: rows.presales.purpose },
    { key: 'aftersales' as PlatformScenarioKey, route: rows.aftersales.example, purpose: rows.aftersales.purpose },
  ];
});
</script>

<style scoped>
.card { background: #fff; border-radius: 8px; padding: 24px; margin-bottom: 16px; }
.desc { color: #666; margin-top: 8px; }
.route-table { width: 100%; border-collapse: collapse; margin-top: 12px; }
.route-table th, .route-table td { border: 1px solid #e8e8e8; padding: 8px 12px; text-align: left; font-size: 13px; }
.route-table th { background: #fafafa; }
.controls { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; margin-bottom: 12px; }
.tag { background: #e6f4ff; color: #1677ff; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-family: monospace; }
.hint { color: #999; font-size: 13px; }
.alert { padding: 12px; border-radius: 6px; }
.alert.info { background: #e6f4ff; }
.alert p { margin: 8px 0 0; color: #666; font-size: 13px; }
.usage-list { margin: 8px 0 0 20px; line-height: 1.8; color: #666; }
code { background: #f6f8fa; padding: 1px 6px; border-radius: 3px; font-size: 12px; }
</style>
