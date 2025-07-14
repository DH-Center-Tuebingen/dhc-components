<template>
    <form class="was-validated">
        <input
            :id="name"
            v-model="validatedValue"
            class="form-control"
            type="number"
            step="0.001"
            placeholder="0.0"
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
    </form>
</template>

<script setup lang="ts">
    import { defineProps, onMounted } from 'vue';

    import { useField } from 'vee-validate';

    import { initI18n } from '../../../i18n/i18n';

    import { isNumber } from '../validation/rulesets';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { DoubleProps } from './definitions';

    onMounted(() => {
        setInitialValue();
    });

    const props = withDefaults(defineProps<DoubleProps>(),{});

    const emit = defineEmits(['change']);

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;

    const setInitialValue = () => {
        return props.defaultValue || undefined;
    };

    const reset = (value: number | undefined) => {
        value = value || props.defaultValue;
        resetField({
            value: value,
        });
    };

    const undirty = (value: number | undefined) => {
        value = value || validatedValue.value;
        reset(value);
    };

    const handleInput = (event: Event) => {
        const resetValidation = event.data === null;
        const inputData = resetValidation ? validatedValue.value : event.data;
        const isNumberInput = !Number.isNaN(parseFloat(inputData));
        computedValidity = resetValidation ? isNumberInput : computedValidity && isNumberInput;
        // handleChange(event?.target?.value);
        emit('change', {
            valid: computedValidity,
            dirty: meta.dirty,
            value: validatedValue.value,
        });
    };

    let computedValidity = true;
    let rules = isNumber();
    if(props.required) {
        rules = rules.required();
    }
    const {
        value: validatedValue,
        errors: validationErrors,
        meta,
        resetField,
        handleChange,
    } = useField(`double_${props.name}`, rules, {
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