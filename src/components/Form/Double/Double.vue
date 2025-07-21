<template>
    <div class="was-validated">
        <input
            :id="name"
            v-model="validatedValue"
            class="form-control"
            type="number"
            placeholder="0.0"
            :step="variableStep"
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
    import { computed, onMounted } from 'vue';

    import { useField } from 'vee-validate';

    import { initI18n } from '../../../i18n/i18n';

    import { number } from '../validation/rulesets';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { DoubleProps } from './definitions';

    onMounted(() => {
        setInitialValue();
        lastStep = computeStepSize();
    });

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

    const setInitialValue = () => {
        console.log("Double default", props.defaultValue);
        return props.defaultValue || '';
    };

    const reset = (value: number | string) => {
        value = value || props.defaultValue;
        resetField({
            value: value,
        });
    };

    const undirty = (value: number | string) => {
        value = value || validatedValue.value;
        reset(value);
    };

    const computeStepSize = () => {
        const matches = validatedValue.value?.toString().match(/\d+(\.(\d+))/);
        return matches ? 1 / Math.pow(10, matches[2].length) : 1;
    };

    const handleInput = (event: Event) => {
        const inputEvent = event as InputEvent;
        // const target = event.currentTarget as HTMLInputElement;
        const resetValidation = inputEvent.data === null;
        const inputData = resetValidation ? validatedValue.value : parseFloat(inputEvent.data);
        const isNumberInput = !Number.isNaN(inputData);
        computedValidity = resetValidation ? isNumberInput : computedValidity && isNumberInput;
        // handleChange(target.value);
        console.log("[Double] changed value to", computedValidity, meta.dirty, validatedValue.value);
        emit('change', {
            valid: computedValidity,
            dirty: meta.dirty,
            value: validatedValue.value,
        });
    };

    let lastStep = 1;
    const variableStep = computed(() => {
        const stepSize = computeStepSize()
        // JS automatically rounds 1.10 to 1.1 (increase step size by factor 10)
        // In this case we do not want to change step size, but keep
        // last step size instead
        if(stepSize == lastStep * 10) {
            return lastStep;
        } else {
            return lastStep = stepSize;
        }
    });

    let computedValidity = true;
    let rules = number();
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
</style>