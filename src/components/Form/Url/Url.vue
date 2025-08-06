<template>
    <div class="was-validated">
        <div class="input-group">
            <input
                :id="name"
                v-model="validatedValue"
                class="form-control input-anchor"
                type="url"
                :disabled="disabled"
                :name="name"
                @input="handleInput"
                @mousedown="preventFocusOnCtrlClick"
                @click="openOnCtrlClick"
            >
            <a
                class="input-group-text text-muted"
                target="_blank"
                :href="validatedValue"
                :title="validatedValue"
            >
                <FontAwesomeIcon
                    :icon="faArrowUpRightFromSquare"
                />
            </a>
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
    import { onMounted } from 'vue';

    import { useField } from 'vee-validate';

    import { initI18n } from '../../../i18n/i18n';

    import { url } from '../validation/rulesets';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

    import { UrlProps } from './definitions';

    onMounted(() => {
        setInitialValue();
    });

    const props = withDefaults(defineProps<UrlProps>(), {
        name: 'Url',
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
        console.log("[Url] changed value to", meta.valid, meta.dirty, validatedValue.value);
        emit('change', {
            valid: meta.valid,
            dirty: meta.dirty,
            value: validatedValue.value,
        });
    };

    const preventFocusOnCtrlClick = (event: Event) => {
        const clickEvent = event as MouseEvent;
        if(clickEvent.ctrlKey) {
            event.preventDefault();
        }
    };

    const openOnCtrlClick = (event: Event) => {
        const clickEvent = event as MouseEvent;
        if(clickEvent.ctrlKey) {
            event.preventDefault();
            window.open(validatedValue.value, '_blank', 'noreferrer');
        }
    };

    let rules = url();
    if(props.required) {
        rules = rules.required();
    }
    const {
        value: validatedValue,
        errors: validationErrors,
        meta,
        resetField,
        handleChange,
    } = useField(`url_${props.name}`, rules, {
        initialValue: setInitialValue(),
    });
</script>

<style scoped>
</style>