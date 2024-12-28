import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  server: {
    port: 9023
  },
  resolve: {
    alias: {
      '@bytedesk/web': path.resolve(__dirname, '../../src')
    }
  }
}) 