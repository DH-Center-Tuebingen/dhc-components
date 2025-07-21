<template>
    <div class="was-validated">
        <input
            :id="name"
            v-model="validatedValue"
            class="form-control"
            type="text"
            placeholder="…"
            :disabled="disabled"
            :name="name"
            @input="handleInput"
        >
        <div class="invalid-feedback">
            <span
                v-for="(msg, i) in validationErrors"
                :key="i"
            >
                {{ msg }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue';

    import { useField } from 'vee-validate';

    import { initI18n } from '../../../i18n/i18n';

    import { string } from '../validation/rulesets';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { StringProps } from './definitions';

    onMounted(() => {
        setInitialValue();
    });

    const props = withDefaults(defineProps<StringProps>(), {
        name: 'String',
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

    const setInitialValue = () => {
        return props.defaultValue || '';
    };

    const reset = (value: string) => {
        value = value || props.defaultValue;
        resetField({
            value: value,
        });
    };

    const undirty = (value: string) => {
        value = value || validatedValue.value;
        reset(value);
    };

    const handleInput = (event: Event) => {
        const target = event.currentTarget as HTMLInputElement;
        handleChange(target.value);
        console.log("[Double] changed value to", meta.valid, meta.dirty, validatedValue.value);
        emit('change', {
            valid: meta.valid,
            dirty: meta.dirty,
            value: validatedValue.value,
        });
    };

    let rules = string();
    if(props.required) {
        rules = rules.required();
    }
    const {
        value: validatedValue,
        errors: validationErrors,
        meta,
        resetField,
        handleChange,
    } = useField(`string_${props.name}`, rules, {
        initialValue: setInitialValue(),
    });
</script>

<style scoped>
</style>