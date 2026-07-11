<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-07-08 10:00:00
 * @Description: Page container component for Vue demo
-->
<template>
  <div :style="{ width: '100%', padding: '24px', boxSizing: 'border-box', ...style }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

interface PageContainerProps {
  style?: CSSProperties;
}

defineProps<PageContainerProps>();
</script>
