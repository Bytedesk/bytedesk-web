/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-30 13:05:55
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-30 13:07:08
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: {
        index: resolve(__dirname, 'src/main.ts'),
        react: resolve(__dirname, 'src/adapters/react.tsx'),
        vue: resolve(__dirname, 'src/adapters/vue.ts'),
        svelte: resolve(__dirname, 'src/adapters/svelte.ts')
      },
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'vue', 'svelte'],
      output: {
        format: 'es',
        dir: 'dist',
        entryFileNames: '[name]/index.js',
        chunkFileNames: '[name]-[hash].js',
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    }
  },
  plugins: [
    react(),
    vue(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      outDir: 'dist/types',
      rollupTypes: true
    })
  ]
}); 