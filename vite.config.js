import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'BytedeskWeb',
      fileName: (format) => {
        switch (format) {
          case 'es':
            return 'bytedesk-web.es.js'
          case 'umd':
            return 'bytedesk-web.umd.js'
          case 'iife':
            return 'bytedesk-web.js'
          default:
            return `bytedesk-web.${format}.js`
        }
      },
      formats: ['es', 'umd', 'iife']
    },
    rollupOptions: {
      external: ['react', 'vue', 'svelte'],
      output: {
        globals: {
          react: 'React',
          vue: 'Vue',
          svelte: 'Svelte'
        }
      }
    }
  }
}) 