/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 13:13:32
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-06-21 09:57:33
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const normalizePath = (value: string) => value.split(path.sep).join('/')

export default defineConfig({
  base: '/reactdemo',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const moduleId = normalizePath(id)

          if (moduleId.includes('/node_modules/')) {
            if (
              moduleId.includes('/react/') ||
              moduleId.includes('/react-dom/') ||
              moduleId.includes('/react-router-dom/') ||
              moduleId.includes('/react-intl/') ||
              moduleId.includes('/scheduler/')
            ) {
              return 'react-vendor'
            }

            if (moduleId.includes('/@ant-design/icons/')) {
              return 'antd-icons'
            }

            if (
              moduleId.includes('/@ant-design/cssinjs/') ||
              moduleId.includes('/@emotion/')
            ) {
              return 'antd-cssinjs'
            }

            if (moduleId.includes('/rc-table/')) {
              return 'antd-table'
            }

            if (
              moduleId.includes('/rc-select/') ||
              moduleId.includes('/rc-tree-select/') ||
              moduleId.includes('/rc-cascader/')
            ) {
              return 'antd-select'
            }

            if (
              moduleId.includes('/rc-picker/') ||
              moduleId.includes('/rc-input-number/')
            ) {
              return 'antd-form-controls'
            }

            const antdTopLevelMatch = moduleId.match(/\/node_modules\/antd\/(?:es|lib)\/([^/]+)/)
            if (antdTopLevelMatch) {
              const chunkName = antdTopLevelMatch[1]
              const sharedChunkNames = new Set([
                'button',
                'card',
                'alert',
                'tag',
                'avatar',
                'dropdown',
                'layout',
                'menu',
                'space',
                'typography',
                'spin',
                'statistic',
                'input',
                'select',
                'table'
              ])

              if (sharedChunkNames.has(chunkName)) {
                return `antd-${chunkName}`
              }
            }

            if (
              moduleId.includes('/antd/') ||
              moduleId.includes('/@ant-design/') ||
              moduleId.includes('/rc-') ||
              moduleId.includes('/@rc-component/') ||
              moduleId.includes('/@ant-design/icons/') ||
              moduleId.includes('/@babel/runtime/')
            ) {
              return 'antd-vendor'
            }

            if (moduleId.includes('/axios/')) {
              return 'network-vendor'
            }

            return 'vendor'
          }

          if (moduleId.includes('/bytedesk_web/src/')) {
            if (moduleId.includes('/bytedesk_web/src/apis/')) {
              return 'bytedesk-api'
            }

            if (moduleId.includes('/bytedesk_web/src/adapters/')) {
              return 'bytedesk-adapters'
            }

            return 'bytedesk-core'
          }

          return undefined
        }
      }
    }
  },
  server: {
    port: 9021
  },
  resolve: {
    dedupe: ['react', 'react-dom', 'react-intl'],
    alias: {
      react: path.resolve(__dirname, '../../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/react-dom'),
      'react-intl': path.resolve(__dirname, '../../node_modules/react-intl'),
      '@bytedesk/web': path.resolve(__dirname, '../../src')
    }
  }
}) 