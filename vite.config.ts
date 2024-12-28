import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'BytedeskWeb',
      fileName: (format) => `bytedesk-web.${format}.js`
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