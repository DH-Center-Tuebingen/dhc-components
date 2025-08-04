<template>
    <div class="was-validated">
        <textarea
            :id="name"
            v-model="validatedValue"
            class="form-control"
            :disabled="disabled"
            :name="name"
            @input="handleInput"
        />
        <div class="text-body-secondary small text-end">
            {{ t('words') }}: {{ wordCount }} ({{ validatedValue.length }})
        </div>
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

    import { string } from '../validation/rulesets';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { StringfieldProps } from './definitions';

    onMounted(() => {
        setInitialValue();
    });

    const props = withDefaults(defineProps<StringfieldProps>(), {
        name: 'Stringfield',
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

    const wordCount = computed(() => {
        return (validatedValue.value.match(/\b\w+\b/g) || []).length;
    });

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
        console.log("[Stringfield] changed value to", meta.valid, meta.dirty, validatedValue.value);
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
    } = useField(`stringfield_${props.name}`, rules, {
        initialValue: setInitialValue(),
    });
</script>

<style scoped>
</style>