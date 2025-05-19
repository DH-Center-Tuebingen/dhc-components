import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const name = 'dhc-components'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '§': path.resolve(__dirname, 'src', 'types'),
        },
    },
    build: {
        target: 'esnext',
        minify: true,
        cssCodeSplit: true,
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name,
            fileName: (format) => `${name}.${format}.js`
        },
        rollupOptions: {
            external: [
                'vue',
                't',
                ///^@milkdown(\/.*)?$/  // Would be good to exclude milkdown as it takes up a lot of space:
                                        // With Milkdown: 1MB
                                        // Without Milkdown: 0.3MB        
            ],
            output: {
                globals: {
                    vue: 'Vue',
                    t: 't',
                    'vue-i18n': 'VueI18n',

                }
            }
        }
    }
});