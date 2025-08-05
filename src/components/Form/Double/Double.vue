<template>
    <div class="was-validated">
        <NumberBase
            ref="inputRef"
            :id="props.name"
            :float="true"
            :disabled="props.disabled"
            :default-value="props.defaultValue"
            :name="props.name"
            @change="handleChange"
            @error="updateErrors"
        />
        <div class="invalid-feedback">
            <div
                v-for="(msg, i) in validationErrors"
                :key="`error-${props.name}-${i}`"
            >
                {{ msg }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import { initI18n } from '../../../i18n/i18n';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import NumberBase from '../NumberBase/NumberBase.vue';

    import { ChangeEvent } from '../Attribute/definitions';
    import { DoubleProps } from './definitions';

    const props = withDefaults(defineProps<DoubleProps>(), {
        name: 'Double',
        disabled: false,
        required: false,
        defaultValue: '',
    });

    const emit = defineEmits(['change']);

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;
    const validationErrors = ref<string[]>([]);
    const inputRef = ref<typeof NumberBase | null>(null);

    const reset = (value: number | string) => {
        inputRef.value?.reset(value);
    };

    const undirty = (value: number | string) => {
        inputRef.value?.undirty(value);
    };

    const handleChange = (event: ChangeEvent) => {
        emit('change', event);
    };

    const updateErrors = (errors: string[]) => {
        validationErrors.value = errors.slice();
    };
</script>

<style scoped>
</style>