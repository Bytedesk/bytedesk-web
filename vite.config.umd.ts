import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'BytedeskWeb',
      formats: ['umd', 'iife'],
      fileName: (format) => format === 'iife' ? 'bytedesk-web.js' : `bytedesk-web.${format}.js`
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'vue',
        'svelte',
        '@angular/core',
        '@angular/common',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        'next'
      ],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'vue': 'Vue',
          'svelte': 'Svelte',
          '@angular/core': 'ng.core',
          '@angular/common': 'ng.common',
          '@angular/platform-browser': 'ng.platformBrowser',
          '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
          'next': 'Next'
        }
      }
    }
  },
  plugins: [react(), vue()]
}); 