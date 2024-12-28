import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 9020
  },
  resolve: {
    alias: {
      '@bytedesk/web': path.resolve(__dirname, '../../src')
    }
  }
}) 