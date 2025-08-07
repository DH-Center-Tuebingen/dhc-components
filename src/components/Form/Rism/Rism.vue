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
                @click="loadRismInfo()"
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
                <div class="d-flex flex-row flex-grow-1 align-items-center gap-1">
                    <span class="fw-bold">
                        {{ infoText.label?.[selectedLanguage][0] }}
                    </span>
                    -
                    <span class="fst-italic">
                        {{ infoText.typeLabel?.[selectedLanguage][0] }}
                    </span>
                </div>
                <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    @click="closeInfoBox()"
                />
            </div>
            <div class="d-flex flex-row align-items-center gap-2 mt-2">
                <span
                    v-for="recordType in infoText.sourceTypes?.recordType.label[selectedLanguage]"
                    class="badge text-bg-primary"
                    :key="`record-record-type-${recordType}`"
                    :title="infoText.sourceTypes?.recordType.type"
                >
                    {{ recordType }}
                </span>
                <span
                    v-for="sourceType in infoText.sourceTypes?.sourceType.label[selectedLanguage]"
                    class="badge text-bg-info"
                    :key="`record-source-type-${sourceType}`"
                    :title="infoText.sourceTypes?.sourceType.type"
                >
                    {{ sourceType }}
                </span>
                <template
                    v-for="contentType in infoText.sourceTypes?.contentTypes"
                    :key="`record-content-type-${contentType}`"
                >
                    <span
                        v-for="contentLabel in contentType.label[selectedLanguage]"
                        class="badge text-bg-success"
                        :key="`record-content-type-label-${contentLabel}`"
                        :title="contentType.type"
                    >
                        {{ contentLabel }}
                    </span>
                </template>
            </div>
            <footer class="blockquote-footer mt-2">
                <cite title="RISM Online">
                    {{ t('information_from') }}
                    <a
                        :href="infoText.id"
                        target="_blank"
                        noreferer
                    >
                        {{ infoText.id }}
                    </a>
                </cite>
            </footer>
            <div class="d-flex align-items-center justify-content-end gap-1">
                <a
                    v-for="language in languages"
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

    import { getRismInfo } from '../../../utils/fetch';

    import { string } from '../validation/rulesets';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faEye } from '@fortawesome/free-solid-svg-icons';

    import {
        rismObject,
        RismProps,
    } from './definitions';

    onMounted(() => {
        setInitialValue();
    });

    const props = withDefaults(defineProps<RismProps>(), {
        name: 'Rism',
        disabled: false,
        required: false,
        metadata: () => ({
            language: 'en'
        }),
        defaultValue: '600176222',
    });

    const emit = defineEmits(['change']);

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;
    const infoText = ref<Partial<rismObject>>({});
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
        console.log("[Rism] changed value to", meta.valid, meta.dirty, validatedValue.value);
        emit('change', {
            valid: meta.valid,
            dirty: meta.dirty,
            value: validatedValue.value,
        });
    };

    const loadRismInfo = () => {
        resetInfoRequest();
        requestState.value = 'requested';
        getRismInfo(validatedValue.value).then((data: rismObject) => {
            infoText.value = {
                id: data.id,
                typeLabel: data.typeLabel,
                label: data.label,
                sourceTypes: data.sourceTypes,
            };
            requestState.value = 'success';
        }).catch(() => {
            infoText.value = {};
            requestState.value = 'failed';
        });
    };

    const setLanguage = (language: string) => {
        infoLanguage.value = language;
    };

    const infoLoaded = computed(() => requestState.value == 'success');
    const infoErrored = computed(() => requestState.value == 'failed');
    const selectedLanguage = computed(() => {
        if(infoLoaded.value) {
            return languages.value.includes(infoLanguage.value) ? infoLanguage.value : languages.value[0];
        }

        return '';
    })
    const languages = computed(() => {
        if(!infoLoaded.value) {
            return [];
        }

        return Object.keys(infoText.value.label || {});
    })

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
    } = useField(`rism_${props.name}`, rules, {
        initialValue: setInitialValue(),
    });
</script>

<style scoped>
</style>