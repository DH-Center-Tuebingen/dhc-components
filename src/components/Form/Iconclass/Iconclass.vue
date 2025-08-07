<template>
    <div class="was-validated">
        <div class="input-group">
            <input
                :id="name"
                v-model="validatedValue"
                class="form-control"
                type="text"
                :disabled="disabled"
                :name="name"
                @input="handleInput"
            >
            <button
                type="button"
                class="btn btn-outline-secondary"
                :disabled="!validatedValue"
                @click="loadIconclassInfo()"
            >
                <FontAwesomeIcon
                    :icon="faEye"
                />
            </button>
        </div>
        <div
            v-if="infoLoaded"
            class="bg-light mt-2 p-2 border rounded"
        >
            <div class="d-flex flex-row justify-content-between">
                <span class="fw-bold">
                    {{ text }}
                </span>
                <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    @click="closeInfoBox()"
                />
            </div>
            <hr class="my-2">
            <div>
                <span>{{ keywords }}</span>
            </div>
            <footer class="blockquote-footer mt-2">
                <cite title="Iconclass">
                    {{ t('information_from') }}
                    <a
                        :href="`http://iconclass.org/${validatedValue}.json`"
                        target="_blank"
                        noreferer
                    >
                        {{ `http://iconclass.org/${validatedValue}.json` }}
                    </a>
                </cite>
            </footer>
            <div class="d-flex align-items-center justify-content-end gap-1">
                <a
                    v-for="language in keywordLanguages"
                    class="badge rounded-pill text-decoration-none"
                    :class="{'text-bg-primary': infoLanguage === language, 'text-bg-secondary': infoLanguage !== language}"
                    href="#"
                    :key="`lang-btn-${language}`"
                    @click.prevent="setLanguage(language)"
                >
                    {{ language.toUpperCase() }}
                </a>
            </div>
        </div>
        <p
            v-if="infoErrored"
            class="alert alert-danger my-2"
        >
            {{ t('notation_doesnt_exist') }}
        </p>
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
    import { computed, onMounted, ref } from 'vue';

    import { useField } from 'vee-validate';

    import { initI18n } from '../../../i18n/i18n';

    import { getIconClassInfo } from '../../../utils/fetch';

    import { string } from '../validation/rulesets';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faEye } from '@fortawesome/free-solid-svg-icons';

    import {
        iconclassObject,
        IconclassProps,
    } from './definitions';

    onMounted(() => {
        setInitialValue();
    });

    const props = withDefaults(defineProps<IconclassProps>(), {
        name: 'Iconclass',
        disabled: false,
        required: false,
        metadata: () => ({
            language: 'en'
        }),
        defaultValue: '',
    });

    const emit = defineEmits(['change']);

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;
    const infoText = ref<Partial<iconclassObject>>({});
    const requestState = ref<string>('not');
    const infoLanguage = ref<string>(props.metadata.language);

    const setInitialValue = () => {
        return props.defaultValue || '';
    };

    const reset = (value: string) => {
        value = value || props.defaultValue;
        resetField({
            value: value,
        });
        resetInfoRequest();
    };

    const undirty = (value: string) => {
        value = value || validatedValue.value;
        reset(value);
    };

    const resetInfoRequest = () => {
        infoText.value = {};
        requestState.value = 'not';
    };

    const closeInfoBox = () => {
        resetInfoRequest();
    };

    const handleInput = (event: Event) => {
        resetInfoRequest();
        const target = event.currentTarget as HTMLInputElement;
        handleChange(target.value);
        console.log("[Iconclass] changed value to", meta.valid, meta.dirty, validatedValue.value);
        emit('change', {
            valid: meta.valid,
            dirty: meta.dirty,
            value: validatedValue.value,
        });
    };

    const loadIconclassInfo = () => {
        resetInfoRequest();
        requestState.value = 'requested';
        getIconClassInfo(validatedValue.value).then(data => {
            if(!!data) {
                infoText.value = data;
                requestState.value = 'success';
            } else {
                infoText.value = {};
                requestState.value = 'failed';
            }
        }).catch(() => {
            requestState.value = 'failed';
        });
    };

    const setLanguage = (language: string) => {
        infoLanguage.value = language;
    };

    const infoLoaded = computed(() => requestState.value == 'success' && !!infoText.value);
    const infoErrored = computed(() => requestState.value == 'failed');
    const getLanguage = (): string | false => {
        if(keywordLanguages.value.length > 0) {
            const langCode = infoLanguage.value.split('_')[0];
            return keywordLanguages.value.find(lang => lang == langCode) || keywordLanguages.value[0];
        }
        return false;
    }
    const keywordLanguages = computed(() => {
        if(infoLoaded.value && infoText.value?.kw) {
            return Object.keys(infoText.value.kw);
        }
        return [];
    })
    const keywords = computed(() => {
        const language = getLanguage();
        if(language === false) {
            return [];
        }
        if(typeof language == 'string' && infoText.value?.kw) {
            return (infoText.value.kw[language]).join(' • ');
        }
        return [];
    });
    const text = computed(() => {
        const language = getLanguage();
        if(language === false) {
            return '';
        }
        if(typeof language == 'string' && infoText.value?.txt) {
            return infoText.value.txt[language];
        }
        return '';
    });

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
    } = useField(`iconclass_${props.name}`, rules, {
        initialValue: setInitialValue(),
    });
</script>

<style scoped>
</style>