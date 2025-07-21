<template>
    <div class="d-flex flex-column attribute-wrapper">
        <component
            :is="attributeType"
            :mode="attributeSubtype"
            :default-value="defaultValue"
            :name="name"
            :disabled="disabled"
            :required="required"
            @change="handleChange"
        />

        <div
            v-if="debug"
            class="font-monospace d-flex flex-column rounded-3 bg-danger bg-opacity-10 mt-3 py-2 px-3"
        >
            <span class="text-muted">Debug</span>
            <span>Value: {{ eventData.value }}</span>
            <span>Valid: {{ eventData.valid }}</span>
            <span>Dirty: {{ eventData.dirty }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';
    import type { Component } from 'vue';

    import Date from '../Datepicker/Datepicker.vue';
    import Double from '../Double/Double.vue';
    import Integer from '../Integer/Integer.vue';
    import String from '../String/String.vue';

    import { initI18n } from '../../../i18n/i18n';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { AttributeProps, AttributeTypeDef, ChangeEvent } from './definitions';

    onMounted(() => {
    });

    const props = withDefaults(defineProps<AttributeProps>(), {
        name: 'AttributeWrapper',
        disabled: false,
        required: false,
        defaultValue: '',
        type: 'string',
        debug: false,
    });

    const emit = defineEmits(['change']);

    const registeredAttributes: Record<AttributeTypeDef, Component> = {
        date: Date,
        daterange: Date,
        double: Double,
        integer: Integer,
        string: String,
    };

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;

    const eventData = ref({
        value: null,
        valid: false,
        dirty: false,
    });

    const attributeType = computed(() => {
        return registeredAttributes[props.type] || 'string';
    });

    const attributeSubtype = computed(() => {
        if(props.type === 'daterange') {
            return 'range';
        }

        return null;
    });

    const reset = (value: any) => {
        // TODO
    };

    const undirty = (value: any) => {
        // TODO
    };

    const handleChange = (event: ChangeEvent) => {
        console.log(event);
        eventData.value.value = event.value;
        eventData.value.valid = event.valid;
        eventData.value.dirty = event.dirty;
        emit('change', event);
    };
</script>

<style scoped>
    :deep(.was-validated .form-control:valid) {
        background-image: none;
        padding-right: 0.75rem;
        border-color: var(--bs-border-color);
    }
    :deep(.was-validated .form-control:invalid) {
        background-image: none;
        padding-right: 0.75rem;
        color: var(--bs-form-invalid-color);
    }
</style>