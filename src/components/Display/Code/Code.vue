<template>
    <div
        class="code position-relative overflow-auto"
        :data-theme="dark ? 'dark' : 'light'"
    >
        <header
            v-if="highlightedValue?.language"
            style="font-size: 0.8rem;"
            class="bg-white text-secondary position-absolute top-0 start-0 w-100 px-4 py-2 border border-bottom-0 rounded-top"
        >
            {{ capitalize(highlightedValue.language) }}
        </header>
        <pre
            class="hljs form-control h-100 py-4 px-4 pt-5 m-0"
            v-if="highlightedValue"
        ><code v-html="highlightedValue.value" /></pre>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import hljs from 'highlight.js/lib/common';
    import { capitalize } from 'lodash';
    import { computed } from 'vue';


    const props = defineProps<{
        value: string;
        language?: string;
        dark?: boolean;
        showLanguage?: boolean;
    }>();

    const highlightedValue = computed(() => {
        // Only set languages if a specific language is provided
        // otherwise, highlight.js will detect the language automatically.
        const languages = props.language
            ? [props.language]
            : undefined;
        return hljs.highlightAuto(props.value, languages);
    });
</script>

<style lang="scss">
    @use "sass:meta";

    .code[data-theme='dark'] {
        @include meta.load-css('highlight.js/styles/github-dark.css');
    }


    .code[data-theme='light'] {
        @include meta.load-css('highlight.js/styles/github.css');
    }

</style>