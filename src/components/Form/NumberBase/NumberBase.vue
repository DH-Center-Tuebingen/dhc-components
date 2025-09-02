<template>
    <input
        :id="name"
        v-model.number="validatedValue"
        ref="inputRef"
        class="form-control"
        type="number"
        :placeholder="float ? '0.0' : '0'"
        :step="numberClassStep"
        :disabled="disabled"
        :name="name"
        @input="handleTextInput"
        @keydown="handleNumberInput"
    >
</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue';

    import { useField } from 'vee-validate';

    import { initI18n } from '../../../i18n/i18n';

    import { integer, number } from '../validation/rulesets';

    import { useNumberInputHotkeys } from '../../../composables/number-input-hotkeys';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { NumberProps } from './definitions';

    const props = withDefaults(defineProps<NumberProps>(), {
        name: 'NumberBase',
        disabled: false,
        required: false,
        defaultValue: '',
        float: true,
    });

    const emit = defineEmits(['change', 'error']);

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;
    const inputRef = ref<HTMLObjectElement | null>(null);

    const setInitialValue = () => {
        return props.float ? (props.defaultValue || '') : (parseInt(props.defaultValue.toString()) || '');
    };

    const reset = (value: number | string) => {
        value = value || props.defaultValue;
        if(!props.float) {
            value = parseInt(value.toString());
        }
        resetField({
            value: value,
        });
    };

    const undirty = (value: number | string) => {
        value = value || validatedValue.value;
        reset(value);
    };

    const handleTextInput = (event: Event) => {
        if(props.float) {
            const inputEvent = event as InputEvent;
            const resetValidation = inputEvent.data === null;
            const inputData = resetValidation ? validatedValue.value : parseFloat(inputEvent.data);
            const isNumberInput = !Number.isNaN(inputData);
            computedValidity = resetValidation ? isNumberInput : computedValidity && isNumberInput;
        } else {
            const target = event.currentTarget as HTMLInputElement;
            computedValidity = target.checkValidity();
        }
        handlePostInput(computedValidity);
    };

    const handleNumberInput = (event: Event) => {
        const keyEvent = event as KeyboardEvent;
        // Do not handle keydown event if not arrow key
        if(keyEvent.key != 'ArrowUp' && keyEvent.key != 'ArrowDown') {
            return;
        }
        onKeydown(keyEvent);
        handlePostInput();
    };

    const handlePostInput = (validity?: boolean) => {
        validity = validity !== undefined ? validity : meta.valid;
        let dirty = meta.dirty;
        if(props.defaultValue == '' && validatedValue.value == '') {
            if(inputRef.value?.validity?.badInput) {
                dirty = true;
            }
        }
        console.log("[NumberBase] changed to", validity, meta.dirty, validatedValue.value);
        emit('change', {
            valid: validity,
            dirty: dirty,
            value: validatedValue.value,
        });
    };

    const numberClassStep = computed(() => {
        return props.float ? 'any' : '1';
    });

    let computedValidity = true;
    let rules = props.float ? number() : integer();
    if(props.required) {
        rules = rules.required();
    }
    const {
        value: validatedValue,
        errors: validationErrors,
        meta,
        resetField,
        handleChange,
    } = useField(`number_${props.name}`, rules, {
        initialValue: setInitialValue(),
    });

    watch(validationErrors, () => {
        emit('error', validationErrors.value);
    });

    const {
        onKeydown,
    } = useNumberInputHotkeys(validatedValue, props.float);
</script>

<style scoped>
</style>