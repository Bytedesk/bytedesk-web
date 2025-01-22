/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:37:51
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-01-22 16:05:17
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// 创建两个独立的构建配置
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/main.ts'),
        react: resolve(__dirname, 'src/adapters/react.tsx'),
        vue: resolve(__dirname, 'src/adapters/vue.ts'),
        svelte: resolve(__dirname, 'src/adapters/svelte.ts'),
        angular: resolve(__dirname, 'src/adapters/angular.ts'),
        nextjs: resolve(__dirname, 'src/adapters/nextjs.tsx')
      },
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'vue', 'svelte', '@angular/core', 'next'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          vue: 'Vue',
          svelte: 'Svelte',
          '@angular/core': 'ng',
          'next': 'Next'
        }
      }
    }
  },
  plugins: [
    react(),
    vue(),
    svelte(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    })
  ],
  resolve: {
    alias: {
      '@bytedesk/web': resolve(__dirname, 'src')
    }
  }
}); 