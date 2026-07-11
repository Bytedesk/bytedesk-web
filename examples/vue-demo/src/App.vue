<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:41:39
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-08 10:00:00
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
-->
<template>
  <div class="app-layout" :style="{ minHeight: '100vh', background: '#f5f5f5' }">
    <!-- Header Navigation -->
    <header class="app-header">
      <nav class="nav-container">
        <router-link
          v-for="link in visibleNavLinks"
          :key="link.path || link.href"
          :to="link.external ? undefined : { path: link.path, query: $route.query }"
          :href="link.external ? link.href : undefined"
          :target="link.external ? '_blank' : undefined"
          class="nav-link"
          :class="{ active: !link.external && $route.path === link.path }"
        >
          {{ link.label }}
        </router-link>
        <div v-if="overflowNavLinks.length > 0" class="more-dropdown">
          <button class="nav-link more-btn">更多 ▼</button>
          <div class="dropdown-menu">
            <a
              v-for="item in overflowNavLinks"
              :key="item.path || item.href"
              :href="item.external ? item.href : undefined"
              :target="item.external ? '_blank' : undefined"
              @click.prevent="!item.external && navigateTo(item.path!)"
              class="dropdown-item"
            >
              {{ item.label }}
            </a>
          </div>
        </div>
      </nav>
      <div class="header-controls">
        <!-- User dropdown -->
        <div class="control-dropdown">
          <button class="control-btn">
            <template v-if="isAnonymousMode">
              <span class="avatar-placeholder">匿</span>
            </template>
            <template v-else>
              <img :src="activeUserProfile.avatar" class="avatar-img" alt="avatar" />
            </template>
          </button>
          <div class="dropdown-menu right">
            <a
              v-for="user in userMenuItems"
              :key="user.key"
              @click.prevent="handleUserChange(user.key)"
              class="dropdown-item"
              :class="{ active: user.active }"
            >
              {{ user.label }}
            </a>
          </div>
        </div>
        <!-- Chat profile dropdown -->
        <div class="control-dropdown">
          <button class="control-btn text-btn">
            {{ selectedChatProfileLabel }}
          </button>
          <div class="dropdown-menu right">
            <a
              v-for="cp in chatProfileMenuItems"
              :key="cp.key"
              @click.prevent="$emit('chatProfileChange', cp.key)"
              class="dropdown-item"
              :class="{ active: cp.active }"
            >
              {{ cp.label }}
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="app-content">
      <router-view
        :locale="locale"
        :theme-mode="themeMode"
        :selected-chat-profile="selectedChatProfile"
        :selected-user="activeUserProfile"
        :is-anonymous-mode="isAnonymousMode"
        @select-user="handleUserChange"
        @anonymous-mode-change="$emit('anonymousModeChange', $event)"
      />
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <a :href="currentSiteUrl" target="_blank" rel="noreferrer" class="footer-link">
        微语官网
      </a>
      <span class="footer-version">v3.0.0</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// @ts-ignore
import type { Language } from '@bytedesk/web/types';
import { getLocaleMessages } from './locales';
import { DEMO_USER_PRESETS, DEMO_ANONYMOUS_KEY, type DemoUserKey, type DemoUserMenuKey, type DemoUserProfile } from './types/demo-user';
import { DEMO_CHAT_PROFILES, DEMO_CHAT_PROFILE_KEYS, getChatProfileLabel, type ChatProfileKey, type DemoChatProfile } from './types/chat-profile';
import { isDevDemo } from './utils/env';

const router = useRouter();
const route = useRoute();

interface Props {
  locale: Language;
  themeMode: string;
  selectedChatProfile: DemoChatProfile;
  activeUserKey: DemoUserKey;
  activeUserProfile: DemoUserProfile;
  isAnonymousMode: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  userChange: [key: DemoUserKey];
  anonymousModeChange: [mode: boolean];
  chatProfileChange: [key: ChatProfileKey];
}>();

const isDebugMode = isDevDemo;

const messages = computed(() => getLocaleMessages(props.locale));

const navLinks = computed(() => [
  { path: '/', label: messages.value.nav.basicDemo },
  { path: '/userInfo', label: messages.value.nav.userInfoDemo },
  { path: '/vipLevel', label: messages.value.nav.vipLevelDemo },
  { path: '/goodsInfo', label: messages.value.nav.goodsInfoDemo },
  { path: '/orderInfo', label: messages.value.nav.orderInfoDemo },
  { path: '/ticket', label: messages.value.nav.ticketDemo },
  { path: '/rating', label: messages.value.nav.ratingDemo },
  { path: '/platform', label: messages.value.nav.platformDemo },
  { path: '/proactive', label: messages.value.nav.proactiveDemo },
  { path: '/webrtcDemo', label: messages.value.nav.webrtcDemo },
  { path: '/unreadCount', label: messages.value.nav.unreadCountDemo },
  { path: '/threadHistory', label: messages.value.nav.threadHistoryDemo },
  { path: '/voiceagent', label: messages.value.nav.voiceAgentDemo },
  { path: '/callCenter', label: messages.value.nav.callCenterDemo },
  ...(isDebugMode ? [{ path: '/helpcenter', label: messages.value.nav.helpcenterDemo }] : []),
  { path: '/documentFeedback', label: messages.value.nav.documentFeedbackDemo },
  { href: 'https://www.weiyuai.cn/demos/', label: 'AgentDemo', external: true as const },
]);

const visibleNavLinks = computed(() => navLinks.value);
const overflowNavLinks = computed(() => [] as typeof navLinks.value);

const userMenuItems = computed(() => {
  const anonKey = DEMO_ANONYMOUS_KEY;
  const items = [
    {
      key: anonKey,
      label: messages.value.pages.userInfoDemo.anonymousUserLabel,
      active: props.isAnonymousMode,
    },
  ];
  for (const key of Object.keys(DEMO_USER_PRESETS) as DemoUserKey[]) {
    items.push({
      key,
      label: messages.value.pages.userInfoDemo.users[key],
      active: !props.isAnonymousMode && props.activeUserKey === key,
    });
  }
  return items;
});

const chatProfileMenuItems = computed(() =>
  DEMO_CHAT_PROFILE_KEYS.map((key) => ({
    key,
    label: getChatProfileLabel(DEMO_CHAT_PROFILES[key], props.locale),
    active: props.selectedChatProfile.key === key,
  }))
);

const selectedChatProfileLabel = computed(() =>
  getChatProfileLabel(props.selectedChatProfile, props.locale)
);

const currentSiteUrl = 'https://www.weiyuai.cn/';

function handleUserChange(key: DemoUserMenuKey) {
  if (key === DEMO_ANONYMOUS_KEY) {
    emit('anonymousModeChange', true);
  } else {
    emit('anonymousModeChange', false);
    emit('userChange', key as DemoUserKey);
  }
}

function navigateTo(path: string) {
  router.push({ path, query: route.query });
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-layout {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  flex-direction: column;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 56px;
}

.nav-container {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  white-space: nowrap;
}

.nav-link {
  padding: 6px 10px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  color: #333;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #f0f0f0;
}

.nav-link.active {
  color: #1677ff;
  background: #e6f4ff;
  font-weight: 600;
}

.header-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;
}

.control-dropdown {
  position: relative;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
  min-height: 36px;
}

.text-btn {
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.avatar-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
}

.control-dropdown:hover .dropdown-menu,
.control-dropdown:focus-within .dropdown-menu {
  display: block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  min-width: 180px;
  z-index: 1000;
  padding: 4px;
}

.dropdown-menu.right {
  right: 0;
}

.dropdown-item {
  display: block;
  padding: 8px 12px;
  font-size: 13px;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f5f5f5;
}

.dropdown-item.active {
  color: #1677ff;
  background: #e6f4ff;
}

.more-dropdown {
  position: relative;
}

.more-dropdown:hover .dropdown-menu {
  display: block;
}

.app-content {
  flex: 1;
  background: #f5f5f5;
}

.app-footer {
  background: #fff;
  border-top: 1px solid #e8e8e8;
  padding: 12px 24px;
  text-align: center;
  font-size: 12px;
}

.footer-link {
  color: #333;
  text-decoration: none;
}

.footer-link:hover {
  color: #1677ff;
}

.footer-version {
  margin-left: 8px;
  color: #999;
}
</style>