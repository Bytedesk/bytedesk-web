import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'
import path from 'path'

export default defineConfig({
  plugins: [svelte({
    preprocess: sveltePreprocess()
  })],
  server: {
    port: 9022
  },
  resolve: {
    alias: {
      '@bytedesk/web': path.resolve(__dirname, '../../src')
    }
  }
}) 