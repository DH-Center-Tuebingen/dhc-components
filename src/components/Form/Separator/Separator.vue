<template>
    <div class="d-flex flex-row align-items-center gap-2 form-control">
        <div
            class="bg-secondary flex-grow-1 rounded-5"
            style="height: 3px;"
        />
        <span class="fw-bold">
            {{ title }}
        </span>
        <div
            class="bg-secondary flex-grow-1 rounded-5"
            style="height: 3px;"
        />
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    import { initI18n } from '../../../i18n/i18n';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { SeparatorProps } from './definitions';

    const props = withDefaults(defineProps<SeparatorProps>(), {
        name: 'Separator',
        disabled: false,
        required: false,
        defaultValue: undefined,
    });

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;

    const title = computed(() => props.defaultValue?.label ? props.defaultValue.label : t('default_title'));
</script>

<style scoped>
</style>