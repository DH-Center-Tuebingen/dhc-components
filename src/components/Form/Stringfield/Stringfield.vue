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
        <div
            v-if="hasLimit || showWordcount"
            class="text-body-secondary small font-sans-serif d-flex flex-row justify-content-end gap-1"
        >
            <span>
                {{ validatedValue.length }}
                <span v-if="hasLimit">/ {{ maxLength }}</span>
            </span>
            <span v-if="showWordcount">({{ t('words', {count: wordCount}) }})</span>
        </div>
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
    import { computed, onMounted } from 'vue';

    import { useField } from 'vee-validate';

    import { initI18n } from '@/i18n/i18n';

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
        showWordcount: true,
        maxLength: -1,
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

    const hasLimit = props.maxLength > 0;

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
        // make sure that content never exceeds max length value
        if(hasLimit && target.value.length >= props.maxLength) {
            target.value = target.value.slice(0, props.maxLength);
        }
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