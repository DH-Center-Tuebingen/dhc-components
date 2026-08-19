/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { globSync } from 'node:fs';
const dirname = path.dirname(fileURLToPath(import.meta.url));

const normalizePath = (file: string) => {
    const normalized = file.replaceAll("\\", "/")
    const name = normalized.split("/").at(-1)
    if(!name) return "";
    return name.replace(/\.vue$/g, "")
}

const exclude = ["Attribute", "Datepicker", "Markdown", "MarkdownEditor", "MarkdownToolbar", "EmojiPicker", "Csv", "CsvSetting", "Richtext", "App"]
const include: string[] = []
let inputs = Object.fromEntries(
    globSync('src/components/**/*.vue')
        //Exclude
        .filter((item) => {
            const filename = normalizePath(item)
            return !exclude.includes(filename)
        })
        //Include
        .filter((item) => {
            if(include.length === 0) return true;
            const normalized = item.replaceAll("\\", "/")
            for(const text of include) {
                if(normalized.includes(text)) return true
            }
            return false;
        })
        .map(file => [
            path.relative('src', file.slice(0, file.length - path.extname(file).length))
                .split(path.sep)
                .filter((_, i, arr) => i !== arr.length - 2)
                .filter((_, i, arr) => i !== 0)
                .join('/')
            ,
            path.resolve(file),
        ]));

const additionalDirectories = ["composables", "utils"]
additionalDirectories.forEach((dir) => {
    const entries = Object.fromEntries(
        globSync(`src/${dir}/**/*.ts`).map((file) => [
            path.relative('src', file.slice(0, file.length - path.extname(file).length))
                .split(path.sep)
                .join('/')
            ,
            path.resolve(file)])
    )
    inputs = {
        ...inputs,
        ...entries
    }
})


// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            '_': fileURLToPath(new URL('.', import.meta.url)),
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    },
    build: {
        lib: {
            entry: {
                index: path.resolve(dirname, 'src/index.ts'),
            },
            formats: ['es'],
            fileName: (_, entryName) => `${entryName}.js`,
        },

        rollupOptions: {
            external: [
                'vue',
                'bootstrap'
            ],

            input: inputs,

            output: {
                format: "es",
                chunkFileNames: "_chunks/[name]-[hash].js",
                globals: {
                    vue: 'Vue',
                },
            },

        },

        sourcemap: true,
        emptyOutDir: true,
    },
    test: {
        projects: [{
            extends: true,
            plugins: [
                // The plugin will run tests for the stories defined in your Storybook config
                // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
                storybookTest({
                    configDir: path.join(dirname, '.storybook')
                })],
            test: {
                name: 'storybook',
                browser: {
                    enabled: true,
                    headless: true,
                    provider: playwright({}),
                    instances: [{
                        browser: 'chromium'
                    }]
                }
            }
        }]
    },
    css: {
        preprocessorOptions: {
            scss: {
                // The current Bootstrap version (5.3.8) uses a Dart version and features that produce
                // a bunch of annoying deprecation warnings, we cannot do anything about. That's why
                // we disable them here. Remove after bootstrap manages this appropriately.
                silenceDeprecations: ['color-functions', 'global-builtin', 'import', 'if-function']
            },
        }
    }
});