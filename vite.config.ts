import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const name = 'dhc-components'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsxPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '$': path.resolve(__dirname, 'src/components'),
      '§': path.resolve(__dirname, 'src/types'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        /**Bootstrap uses legacy sass code. This silences the warnings. */
        quietDeps: true,
      }
    },
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name,
      fileName: (format) => `${name}.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
          t: 't'
        }
      },
    }
  }
});