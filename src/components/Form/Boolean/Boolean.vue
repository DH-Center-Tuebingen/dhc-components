<template>
    <div
        class="btn-group d-flex flex-row"
        role="group"
    >
        <button
            class="btn btn-sm rounded-start-pill flex-grow-0 px-3"
            :class="selectionBtnClasses"
            :disabled="disabled"
            @click="handleChange(false)"
        >
            <span v-if="isSelected">
                <FontAwesomeIcon
                    :icon="faCheck"
                />
            </span>
            <span v-else-if="isNotSelected">
                <FontAwesomeIcon
                    :icon="faTimes"
                />
            </span>
            <span v-else>
                <FontAwesomeIcon
                    :icon="faQuestion"
                />
            </span>
        </button>
        <button
            v-if="isSet && !disabled"
            class="btn btn-sm btn-outline-secondary flex-grow-0 px-3"
            :class="unsetBtnClasses"
            @click="handleUnset"
        >
            <FontAwesomeIcon
                :icon="faTrash"
            />
        </button>
        <button
            v-if="showText"
            class="btn btn-sm btn-outline-secondary rounded-end-pill flex-grow-1"
            disabled
        >
            <span v-if="isSelected">
                {{ t('selected') }}
            </span>
            <span v-else-if="isNotSelected">
                {{ t('not_selected') }}
            </span>
            <span v-else>
                {{ t('unset') }}
            </span>
        </button>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';

    import { initI18n } from '../../../i18n/i18n';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCheck, faQuestion, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

    import { BooleanProps } from './definitions';

    const props = withDefaults(defineProps<BooleanProps>(), {
        name: 'Boolean',
        disabled: false,
        required: false,
        defaultValue: null,
        showText: false,
    });

    onMounted(() => {
        initialValue.value = trueify(props.defaultValue);
        currentValue.value = initialValue.value;
    });

    const emit = defineEmits(['change']);

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;
    const initialValue = ref<boolean | null>(null);
    const currentValue = ref<boolean | null>(null);

    const isSelected = computed(() => currentValue.value === true);
    const isNotSelected = computed(() => currentValue.value === false);
    const isUnset = computed(() => !isSelected.value && !isNotSelected.value);
    const isSet = computed(() => isSelected.value || isNotSelected.value);

    const selectionBtnClasses = computed(() => {
        const classes = [];
        if(isNotSelected.value) {
            classes.push('btn-danger');
        } else if(isSelected.value) {
            classes.push('btn-success');
        } else if(isUnset.value) {
            classes.push('btn-secondary');
        }
        if(!props.showText && isUnset.value) {
            classes.push('rounded-end-pill');
        }
        return classes;
    });
    const unsetBtnClasses = computed(() => {
        const classes = [];
        if(!props.showText) {
            classes.push('rounded-end-pill');
        }
        return classes;
    })

    const trueify = (value: boolean | string | null) => {
        if(value === 'true' || value === true || value === '1') {
            return true;
        } else if(value === 'false' || value === false || value === '0') {
            return false;
        }

        return null;
    };

    const reset = (value: boolean | string | null) => {
        currentValue.value = trueify(value || initialValue.value);
    };

    const undirty = (value: boolean | string | null) => {
        reset(value || initialValue.value);
        initialValue.value = currentValue.value;
    };

    const handleUnset = () => {
        currentValue.value = null;
        emit('change', {
            valid: true,
            dirty: currentValue.value === initialValue.value,
            value: currentValue.value,
        });
    };

    const handleChange = (defaultValue: boolean) => {
        if(currentValue.value === null) {
            currentValue.value = defaultValue;
        } else {
            currentValue.value = !currentValue.value;
        }
        emit('change', {
            valid: true,
            dirty: currentValue.value === initialValue.value,
            value: currentValue.value,
        });
    };
</script>

<style scoped>
</style>