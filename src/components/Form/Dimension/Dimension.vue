<template>
    <div class="dimension-wrapper was-validated">
        <div class="input-group">
            <NumberBase
                class="text-center"
                ref="widthInputRef"
                :id="`${props.name}-B`"
                :float="true"
                :disabled="props.disabled"
                :default-value="props.defaultValue.B || 0 as number"
                :name="`${props.name}-B`"
                @change="e => handleChange(e, 'B')"
                @error="e => updateErrors(e, 'B')"
            />
            <span class="input-group-text">&times;</span>
            <NumberBase
                class="text-center"
                ref="heightInputRef"
                :id="`${props.name}-H`"
                :float="true"
                :disabled="props.disabled"
                :default-value="props.defaultValue.H || 0 as number"
                :name="`${props.name}-H`"
                @change="e => handleChange(e, 'H')"
                @error="e => updateErrors(e, 'H')"
            />
            <span class="input-group-text">&times;</span>
            <NumberBase
                class="text-center"
                ref="depthInputRef"
                :id="`${props.name}-T`"
                :float="true"
                :disabled="props.disabled"
                :default-value="props.defaultValue.T || 0 as number"
                :name="`${props.name}-T`"
                @change="e => handleChange(e, 'T')"
                @error="e => updateErrors(e, 'T')"
            />
            <button
                class="btn btn-outline-secondary  dropdown-toggle rounded-end"
                :disabled="disabled"
                type="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                {{ validatedUnit }}
            </button>
            <div class="dropdown-menu">
                <a
                    v-for="(unit, i) in units"
                    :key="i"
                    class="dropdown-item"
                    href="#"
                    @click.prevent="setUnit(unit)"
                >
                    {{ unit }}
                </a>
            </div>
            <div class="invalid-feedback">
                <div
                    v-for="(msg, i) in combinedErrors"
                    :key="`error-${props.name}-${i}`"
                >
                    {{ msg }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';

    import { useField } from 'vee-validate';

    import { initI18n } from '../../../i18n/i18n';

    import { object } from '../validation/rulesets';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import NumberBase from '../NumberBase/NumberBase.vue';

    import {
        ChangeEvent,
        metaValues,
    } from '../Attribute/definitions';
    import {
            DimensionProps,
            unitsAsArray,
            dimKeys,
            unitKeys,
            metaValueKeys,
            valueKeys,
    } from './definitions';

    onMounted(() => {
    });

    const props = withDefaults(defineProps<DimensionProps>(), {
        name: 'Dimension',
        disabled: false,
        required: false,
        defaultValue: {
            B: 2,
            H: 2,
            T: 2,
            unit: 'mm',
        } as any,
    });

    const emit = defineEmits(['change']);

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;
    const validationErrors = ref<Record<dimKeys, string[]>>({
        B: [],
        H: [],
        T: [],
    });
    const numberMetas = ref<Record<dimKeys, metaValues>>({
        B: {
            valid: false,
            dirty: false,
            value: null,
        },
        H: {
            valid: false,
            dirty: false,
            value: null,
        },
        T: {
            valid: false,
            dirty: false,
            value: null,
        },
    });
    const widthInputRef = ref<typeof NumberBase | null>(null);
    const heightInputRef = ref<typeof NumberBase | null>(null);
    const depthInputRef = ref<typeof NumberBase | null>(null);
    const units = unitsAsArray;

    const setInitialValue = (part: 'value' | 'unit') => {
        if(part == 'value') {
            return props.defaultValue ? {B: '', H: '', T: ''} : {};
        } else {
            return props.defaultValue?.unit;
        }
    };

    const reset = (value: metaValueKeys) => {
        value = value || props.defaultValue;
        widthInputRef.value?.reset(value?.B);
        heightInputRef.value?.reset(value?.H);
        depthInputRef.value?.reset(value?.T);
        resetUnit({
            value: value?.unit,
        });
    };

    const undirty = (value: metaValueKeys) => {
        value = value || meta.value;
        reset(value);
    };

    const setUnit = (unit: unitKeys) => {
        handleUnitChange(unit);
        emitChanges();
    };

    const handleChange = (event: ChangeEvent, key: dimKeys) => {
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

    const updateErrors = (errors: string[], key: dimKeys) => {
        validationErrors.value[key] = errors.slice();
    };

    let unitRules = object();
    if(props.required) {
        unitRules = unitRules.required();
    }
    const {
        value: validatedUnit,
        errors: validationUnitErrors,
        meta: unitMeta,
        resetField: resetUnit,
        handleChange: handleUnitChange,
    } = useField(`dimension_unit_${props.name}`, unitRules, {
        initialValue: setInitialValue('unit'),
    });

    const combinedErrors = computed(() => {
        return Object.values(validationErrors.value).flat().concat(validationUnitErrors.value);
    });

    const meta = computed(() => {
        // only dimensions without unit need to pass validity check
        let isValid = true;
        let isDirty = false;
        const computedValue: Partial<metaValueKeys> = {};
        for(let key in numberMetas.value) {
            const typedKey = key as dimKeys;
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
        isDirty = isDirty || unitMeta.dirty;
        computedValue.unit = validatedUnit.value as unitKeys;
        return {
            valid: isValid,
            dirty: isDirty,
            value: computedValue,
        };
    });
</script>

<style lang="scss" scoped>
</style>