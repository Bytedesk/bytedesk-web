/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:37:51
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-30 13:06:02
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
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// 创建两个独立的构建配置
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'BytedeskWeb',
      formats: ['umd'],
      fileName: (format) => `bytedesk-web.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'vue', 'svelte'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          vue: 'Vue',
          svelte: 'Svelte'
        },
        inlineDynamicImports: false
      }
    }
  },
  plugins: [
    react(),
    vue(),
    {
      ...dts({
        insertTypesEntry: true,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        outDir: 'dist/types'
      }),
      apply: 'build'
    },
    {
      name: 'build-esm',
      apply: 'build',
      config(config) {
        return {
          build: {
            lib: {
              entry: {
                index: resolve(__dirname, 'src/main.ts'),
                react: resolve(__dirname, 'src/adapters/react.tsx'),
                vue: resolve(__dirname, 'src/adapters/vue.ts'),
                svelte: resolve(__dirname, 'src/adapters/svelte.ts')
              },
              formats: ['es'],
              fileName: (format, entryName) => `${entryName}/index.js`
            },
            rollupOptions: {
              external: ['react', 'react-dom', 'vue', 'svelte'],
              preserveModules: true,
              preserveModulesRoot: 'src'
            }
          }
        };
      }
    }
  ]
}); 