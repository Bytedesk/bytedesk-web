<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-07-08 10:00:00
 * @Description: Current user profile display component for Vue demo
-->
<template>
  <div :style="{ display: 'flex', alignItems: 'center', gap: '12px' }">
    <template v-if="isAnonymous">
      <div
        :style="{
          width: compact ? '28px' : '40px',
          height: compact ? '28px' : '40px',
          borderRadius: '50%',
          backgroundColor: '#e8e8e8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: compact ? '12px' : '16px',
          color: '#666',
          flexShrink: 0,
        }"
      >
        匿
      </div>
      <div v-if="!compact" style="display: flex; flexDirection: column; gap: '2px'">
        <span style="fontSize: '13px'; color: '#999'">uid: -</span>
        <span style="fontSize: '13px'; color: '#999'">匿名用户</span>
      </div>
    </template>
    <template v-else>
      <img
        :src="avatar"
        :style="{
          width: compact ? '28px' : '40px',
          height: compact ? '28px' : '40px',
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
        }"
        alt="avatar"
      />
      <div v-if="!compact" style="display: flex; flexDirection: column; gap: '2px'">
        <span :style="{ fontSize: '12px', color: '#999' }">uid: {{ visitorUid }}</span>
        <span :style="{ fontSize: '13px', fontWeight: 500 }">{{ nickname }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
interface CurrentUserProfileProps {
  visitorUid: string;
  avatar: string;
  nickname: string;
  isAnonymous?: boolean;
  compact?: boolean;
}

withDefaults(defineProps<CurrentUserProfileProps>(), {
  isAnonymous: false,
  compact: false,
});
</script>
