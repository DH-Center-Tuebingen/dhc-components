<template>
    <Multiselect
        ref="multiselectRef"
        :name="name"
        :default-value="defaultValue"
        :options="options"
        :searchable="true"
        :metadata="metadata"
        :multiple="multiple"
        @change="handleChange"
    />
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    import { initI18n } from '../../../i18n/i18n';

    import Multiselect from '../../Multiselect/Multiselect.vue';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { MultiselectProps } from './definitions';
    import { MultiSelectOptions } from '../../Multiselect/definitions';

    onMounted(() => {
        setInitialValue();
    });

    const props = withDefaults(defineProps<MultiselectProps>(), {
        name: 'Multiselect',
        disabled: false,
        required: false,
        defaultValue: () => ({}),
        mode: 'single',
        options: () => ([]),
    });

    const emit = defineEmits(['change']);

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;

    const multiselectRef = ref<typeof Multiselect | null>(null);

    const setInitialValue = () => {
        return props.defaultValue || {};
    };

    const reset = (value: Record<string, any>) => {
        multiselectRef.value?.reset(value);
    };

    const undirty = (value: Record<string, any>) => {
        multiselectRef.value?.undirty(value);
    };

    const handleChange = (event: Event) => {
        console.log("eventData", event)
        emit('change', event);
    };

    const metadata: MultiSelectOptions = {
        asObject: true,
        valueProp: 'id',
        label: 'label',
        hideSelected: true,
        searchable: true,
        trackBy: ['label'],
    };
    const multiple = props.mode === 'multiple';
</script>

<style src="@vueform/multiselect/themes/default.css"></style>