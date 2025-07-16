<template>
    <div class="was-validated">
        <input
            :id="name"
            v-model="validatedValue"
            class="form-control"
            type="number"
            step="1"
            placeholder="0"
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
    import { defineProps, onMounted } from 'vue';

    import { useField } from 'vee-validate';

    import { initI18n } from '../../../i18n/i18n';

    import { integer } from '../validation/rulesets';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { IntegerProps } from './definitions';

    onMounted(() => {
        setInitialValue();
    });

    const props = withDefaults(defineProps<IntegerProps>(), {
        name: 'Integer',
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
        console.log("Integer default", props.defaultValue);
        return parseInt(props.defaultValue.toString()) || '';
    };

    const reset = (value: number | string) => {
        value = value || props.defaultValue;
        resetField({
            value: parseInt(value.toString()),
        });
    };

    const undirty = (value: number | string) => {
        value = value || validatedValue.value;
        reset(value);
    };

    const handleInput = (event: Event) => {
        const target = event.currentTarget as HTMLInputElement;
        handleChange(parseInt(target.value));
        const isValid = target.checkValidity();
        console.log("[Integer] changed value to", isValid, meta.dirty, validatedValue.value);
        emit('change', {
            valid: isValid,
            dirty: meta.dirty,
            value: validatedValue.value,
        });
    };

    let rules = integer();
    if(props.required) {
        rules = rules.required();
    }
    const {
        value: validatedValue,
        errors: validationErrors,
        meta,
        resetField,
        handleChange,
    } = useField(`integer_${props.name}`, rules, {
        initialValue: setInitialValue(),
    });
</script>

<style scoped>
    .was-validated .form-control:valid {
        background-image: none;
        padding-right: 0.75rem;
    }
    .was-validated .form-control:invalid {
        background-image: none;
        padding-right: 0.75rem;
        color: var(--bs-form-invalid-color);
    }
</style>