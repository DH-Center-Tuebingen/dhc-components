<template>
    <div class="was-validated timeperiod-wrapper">
        <div class="input-group">
            <button
                type="button"
                class="btn btn-outline-secondary dropdown-toggle"
                :class="{'border-danger': additionalErrors.length > 0}"
                :disabled="disabled"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <span v-if="startLabelValue">
                    <!-- {{ t(`main.entity.attributes.${v.startLabel.value}`) }} -->
                    {{ startLabelValue }}
                </span>
            </button>
            <ul class="dropdown-menu">
                <a
                    v-for="(label, i) in timeLabelArray"
                    :key="i"
                    class="dropdown-item"
                    href="#"
                    @click.prevent="setLabel('start', label)"
                >
                    <!-- {{ t(`main.entity.attributes.${label}`) }} -->
                    {{ label }}
                </a>
            </ul>
            <NumberBase
                ref="startRef"
                :id="`start-${name}`"
                :float="false"
                :disabled="disabled"
                :default-value="defaultValue.start || ''"
                :name="`start-${name}`"
                @change="e => handleChange(e, 'start')"
                @error="e => updateErrors(e, 'start')"
            />
            <span class="input-group-text">-</span>
            <NumberBase
                ref="endRef"
                :id="`end-${name}`"
                :float="false"
                :disabled="disabled"
                :default-value="defaultValue.end || ''"
                :name="`end-${name}`"
                @change="e => handleChange(e, 'end')"
                @error="e => updateErrors(e, 'end')"
            />
            <button
                type="button"
                class="btn btn-outline-secondary dropdown-toggle"
                :class="{'border-danger': additionalErrors.length > 0}"
                :disabled="disabled"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <span v-if="endLabelValue">
                    <!-- {{ t(`main.entity.attributes.${v.endLabel.value}`) }} -->
                    {{ endLabelValue }}
                </span>
            </button>
            <ul
                uib-dropdown-menu
                class="dropdown-menu"
            >
                <a
                    v-for="(label, i) in timeLabelArray"
                    :key="i"
                    class="dropdown-item"
                    href="#"
                    @click.prevent="setLabel('end', label)"
                >
                    <!-- {{ t(`main.entity.attributes.${label}`) }} -->
                    {{ label }}
                </a>
            </ul>
        </div>
        <div
            v-if="epochMode"
            class="bg-danger w-100 h-25"
        >
            {{ mode }}
        </div>
        <div
            v-if="combinedErrors.length > 0"
            class="text-danger small"
        >
            <div
                v-for="(msg, i) in combinedErrors"
                :key="`error-${name}-${i}`"
            >
                {{ msg }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ComputedRef, onMounted, ref } from 'vue';

    import { useField } from 'vee-validate';

    import { initI18n } from '../../../i18n/i18n';

    import { string } from '../validation/rulesets';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import NumberBase from '../NumberBase/NumberBase.vue';

    import {
        ChangeEvent,
        metaValues,
    } from '../Attribute/definitions';

    import {
        timeLabelArray,
        timeLabels,
        inputFieldKeys,
        metaValueKeys,
        valueKeys,
        TimeperiodProps,
    } from './definitions';

    onMounted(() => {
        setInitialValue();
    });

    const props = withDefaults(defineProps<TimeperiodProps>(), {
        name: 'Timeperiod',
        disabled: false,
        mode: 'timeperiod',
        epochs: [] as any, // TODO
        defaultValue: () => ({}),
    });

    const emit = defineEmits(['change']);

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;
    const validationErrors = ref<Record<inputFieldKeys, string[]>>({
        start: [],
        end: [],
    });
    const numberMetas = ref<Record<inputFieldKeys, metaValues>>({
        start: {
            valid: false,
            dirty: false,
            value: null,
        },
        end: {
            valid: false,
            dirty: false,
            value: null,
        },
    });
    const startRef = ref<typeof NumberBase | null>(null);
    const endRef = ref<typeof NumberBase | null>(null);
    const epochMode = props.mode === 'epoch';

    numberMetas.value.start.value = props.defaultValue.start;
    numberMetas.value.end.value = props.defaultValue.end;

    const setInitialValue = (prop?: valueKeys) => {
        const value = props.defaultValue || {};
        if(prop) {
            return value[prop];
        }

        return value;
    };

    const reset = (value: metaValueKeys) => {
        value = value || props.defaultValue;
        startRef.value?.reset(value?.start);
        endRef.value?.reset(value?.end);
        startLabelReset({
            value: value?.startLabel,
        });
        endLabelReset({
            value: value?.endLabel,
        });
    };

    const undirty = (value: metaValueKeys) => {
        value = value || meta.value;
        reset(value);
    };

    const setLabel = (prop: 'start' | 'end', value: 'BC' | 'AD') => {
        if(prop == 'start') {
            startLabelValue.value = value;
            startLabelChange(startLabelValue.value);
        } else {
            endLabelValue.value = value;
            endLabelChange(endLabelValue.value);
        }
        emitChanges();
    };

    const handleChange = (event: ChangeEvent, key: inputFieldKeys) => {
        numberMetas.value[key].dirty = event.dirty;
        numberMetas.value[key].valid = event.valid;
        numberMetas.value[key].value = event.value;
        emitChanges();
    };

    const emitChanges = () => {
        emit('change', {
            valid: meta.value.valid,
            dirty: meta.value.dirty,
            value: meta.value.value,
        });
    };

    const updateErrors = (errors: string[], key: inputFieldKeys) => {
        validationErrors.value[key] = errors.slice();
    };

    const inputValueSet = (prop: inputFieldKeys): boolean => {
        return numberMetas.value[prop].value !== '' && numberMetas.value[prop].value !== undefined && numberMetas.value[prop].value !== null;
    };

    const invalidLabels: ComputedRef<boolean> = computed(() => startLabelValue.value === 'AD' && endLabelValue.value === 'BC');

    const invalidCombination: ComputedRef<boolean> = computed(() => {
        if(startLabelValue.value === endLabelValue.value) {
            const startLarger = numberMetas.value.start.value > numberMetas.value.end.value;
            if(
                (startLabelValue.value == 'BC' && !startLarger)
                ||
                (startLabelValue.value == 'AD' && startLarger)
            ) {
                return true;
            }
        }
        return false;
    });

    const fieldCombinationSet: ComputedRef<boolean> = computed(() => {
        const startValue = inputValueSet('start');
        const endValue = inputValueSet('end');
        return Boolean((
            (!startLabelValue.value && !startValue) ||
            (startLabelValue.value && startValue)
        ) && (
            (!endLabelValue.value && !endValue) ||
            (endLabelValue.value && endValue)
        ));
    })

    const additionalErrors = computed(() => {
        const errors = [];
        if(invalidLabels.value) {
            errors.push(t('start_label_after_end'));
        }
        if(invalidCombination.value) {
            errors.push(t('start_after_end'));
        }
        if(!fieldCombinationSet.value) {
            errors.push(t('missing_combination'))
        }
        return errors;
    });

    const combinedErrors = computed(() => {
        return Object.values(validationErrors.value).flat().concat(additionalErrors.value);
    });

    const meta = computed(() => {
        // only dimensions without unit need to pass validity check
        let isValid = true;
        let isDirty = false;
        const computedValue: Partial<metaValueKeys> = {};
        for(let key in numberMetas.value) {
            const typedKey = key as inputFieldKeys;
            const meta = numberMetas.value[typedKey];
            // update valid state only if attribute was updated before aka dirty
            // otherwise validity is set to false, because it is initialized
            // as false
            if(meta.dirty) {
                isValid = isValid && meta.valid;
                computedValue[typedKey] = meta.value;
            } else {
                computedValue[typedKey] = props.defaultValue[typedKey];
            }
            isDirty = isDirty || meta.dirty;
        }
        isDirty = isDirty || startLabelMeta.dirty || endLabelMeta.dirty;
        isValid = isValid && !invalidLabels.value && !invalidCombination.value && fieldCombinationSet.value;
        computedValue.startLabel = startLabelValue.value as timeLabels;
        computedValue.endLabel = endLabelValue.value as timeLabels;
        return {
            valid: isValid,
            dirty: isDirty,
            value: computedValue,
        };
    });

    let stringRules = string();
    if(props.required) {
        stringRules = stringRules.required();
    }

    const {
        value: startLabelValue,
        meta: startLabelMeta,
        resetField: startLabelReset,
        handleChange: startLabelChange,
    } = useField(`timeperiod_startlabel_${props.name}`, stringRules, {
        initialValue: setInitialValue('startLabel'),
    });
    const {
        value: endLabelValue,
        meta: endLabelMeta,
        resetField: endLabelReset,
        handleChange: endLabelChange,
    } = useField(`timeperiod_endlabel_${props.name}`, stringRules, {
        initialValue: setInitialValue('endLabel'),
    });
</script>

<style scoped>
    .timeperiod-wrapper {
        height: 200px;
    }
</style>