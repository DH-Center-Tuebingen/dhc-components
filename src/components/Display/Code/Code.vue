<template>
    <div
        class="code position-relative overflow-auto"
        :data-theme="dark ? 'dark' : 'light'"
    >
        <pre
            class="hljs form-control h-100 py-4 px-4 m-0"
            v-if="highlightedValue"
        ><code v-html="highlightedValue" /></pre>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import hljs from 'highlight.js/lib/common';
    import { computed } from 'vue';


    const props = defineProps<{
        value: string;
        dark?: boolean; // Optional prop to determine if dark mode is enabled
    }>();

    const highlightedValue = computed(() => {
        const formatted = hljs.highlightAuto(props.value);
        return formatted.value;
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