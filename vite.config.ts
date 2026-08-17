import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { globSync } from 'tinyglobby'
import { extname, relative, resolve } from 'node:path'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const srcDir = resolve(__dirname, 'src')
const componentsDir = resolve(srcDir, 'components')

const entries = Object.fromEntries(
    globSync('src/components/**/*.vue').map(file => {
        const absolutePath = resolve(file)

        const relativePath = relative(
            srcDir,
            absolutePath
        ).replaceAll('\\', '/')

        return [
            relativePath,
            absolutePath
        ]
    })
)

entries.index = resolve(srcDir, 'index.ts')

export default defineConfig({
    plugins: [
        vue(),
    ],

    resolve: {
        alias: {
            '@': srcDir,
            '@scss': resolve(srcDir, 'scss'),
            '§': resolve(srcDir, 'types'),
            '$': resolve(srcDir, '.storybook'),
        },
    },

    build: {
        target: 'esnext',
        minify: false,
        cssCodeSplit: true,
        sourcemap: true,

        rollupOptions: {
            input: entries,

            preserveEntrySignatures: 'exports-only',

            external: [
                'vue',
                'lodash',
                'dayjs',
                'dayjs/plugin/utc',
                'dayjs/plugin/relativeTime',
                'dayjs/plugin/customParseFormat',
                'bootstrap',
            ],

            output: {
                format: 'es',
                preserveModules: true,
                preserveModulesRoot: 'src',

                entryFileNames: '[name].js',
                chunkFileNames: '_chunks/[name]-[hash].js',
                assetFileNames: 'assets/[name][extname]',
            }
        }
    },
})