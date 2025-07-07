<template>
    <div
        class="code position-relative form-control d-flex flex-column"
        :data-theme="dark ? 'dark' : 'light'"
    >
        <header
            v-if="showName || showLanguage"
            style="font-size: 0.8rem;"
            class="bg-white pb-2 text-secondary"
        >
            <span v-if="showName">{{ name }}</span>
            <span v-if="showLanguage">{{ capitalize(highlightedValue.language) }}</span>
        </header>
        <pre
            class="hljs overflow-auto flex-fill m-0"
            :class="contentClasses"
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


    const props = withDefaults(defineProps<{
        name?: string;
        value: string;
        language?: string;
        dark?: boolean;
        showLanguage?: boolean;
        rounded?: boolean;
    }>(), {
        name: '',
        dark: false,
        showLanguage: true,
        rounded: false,
    });

    const contentClasses = computed(() => {
        const classes = ['p-2'];
        if(props.rounded) {
            classes.push('rounded');
        }
        return classes;
    });

    const highlightedValue = computed(() => {
        // Only set languages if a specific language is provided
        // otherwise, highlight.js will detect the language automatically.
        const languages = props.language
            ? [props.language]
            : undefined;
        return hljs.highlightAuto(props.value, languages);
    });

    const showLanguage = computed(() => {
        return props.showLanguage && highlightedValue.value?.language != null;
    });

    const showName = computed(() => {
        return props.name && props.name.length > 0;
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