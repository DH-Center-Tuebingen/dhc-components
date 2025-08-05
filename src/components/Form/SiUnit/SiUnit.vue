<template>
    <div class="si-unit-wrapper was-validated">
        <div class="input-group">
            <NumberBase
                class="text-center"
                ref="inputRef"
                :id="props.name"
                :float="true"
                :disabled="props.disabled"
                :default-value="props.defaultValue?.value"
                :name="props.name"
                @change="handleChange"
                @error="updateErrors"
            />
            <button
                class="btn btn-outline-secondary dropdown-toggle rounded-end"
                :disabled="disabled"
                type="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                {{ siSymbolToStr(validatedUnit?.symbol) }}
            </button>
            <div class="dropdown-menu">
                <a
                    v-for="(unit, i) in groupUnits"
                    :key="i"
                    class="dropdown-item d-flex flex-row justify-content-between gap-3"
                    :class="{ 'active': unit.label == validatedUnit?.label }"
                    href="#"
                    @click.prevent="handleUnitInput(unit)"
                >
                    <span>
                        {{ siSymbolToStr(unit.symbol) }}
                    </span>
                    <span
                        :class="{ 'text-light text-opacity-75': unit.label == validatedUnit?.label, 'text-body-secondary': unit.label != validatedUnit?.label }"
                    >
                        {{ t(`${unitGrp}.units.${unit.label}`) }}
                    </span>
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

    import unitGroups from './units';

    import { siSymbolToStr } from '../../../utils/si';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import NumberBase from '../NumberBase/NumberBase.vue';

    import { ChangeEvent } from '../Attribute/definitions';
    import { SiUnitProps } from './definitions';

    onMounted(() => {
    });

    const props = withDefaults(defineProps<SiUnitProps>(), {
        name: 'SiUnit',
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
    const validationErrors = ref<string[]>([]);
    const numberMeta = ref<Record<'valid' | 'dirty' | 'value', boolean | any>>({
        valid: false,
        dirty: false,
        value: null,
    });
    const inputRef = ref<typeof NumberBase | null>(null);

    const unitGrp = props.metadata?.si_baseunit;
    const groupUnits = computed(() => {
        if(!unitGrp) {
            return [];
        }

        let group = unitGroups[unitGrp];
        if(!group || !group.units) {
            return [];
        }

        return group.units;
    });

    const setInitialValue = (part: 'value' | 'unit') => {
        console.log('setInitialValue', props.defaultValue)
        if(part == 'value') {
            return props.defaultValue ? props.defaultValue.value : '';
        } else {
            if(props.defaultValue?.unit) {
                return groupUnits.value.find((u: Record<'label' | 'symbol' | 'conversion', any>) => u.label == props.defaultValue.unit);
            } else {
                return {};
            }
        }
    };

    const reset = (value: Record<'value' | 'unit', any>) => {
        value = value || props.defaultValue;
        inputRef.value?.reset(value?.value);
        let unitValue = {};
        if(value?.unit) {
            unitValue = groupUnits.value.find((u: Record<'label' | 'symbol' | 'conversion', any>) => u.label == value.unit);
        }
        resetUnit({
            value: unitValue,
        });
    };

    const undirty = (value: Record<'value' | 'unit', any>) => {
        value = value || computedValue.value;
        reset(value);
    };

    const handleChange = (event: ChangeEvent) => {
        numberMeta.value.dirty = event.dirty;
        numberMeta.value.valid = event.valid;
        numberMeta.value.value = event.value;
        emitChanges();
    };

    const handleUnitInput = (unit: any) => {
        handleUnitChange(unit);
        emitChanges();
    };

    const emitChanges = () => {
        emit('change', {
            valid: meta.value.valid,
            dirty: meta.value.dirty,
            value: computedValue.value,
        });
    }

    const updateErrors = (errors: string[]) => {
        validationErrors.value = errors.slice();
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
    } = useField(`si_unit_${props.name}`, unitRules, {
        initialValue: setInitialValue('unit'),
    });

    const combinedErrors = computed(() => {
        return validationErrors.value.concat(validationUnitErrors.value);
    });
    const meta = computed(() => {
        let isValid = true;
        if(numberMeta.value.dirty) {
            isValid = isValid && numberMeta.value.valid;
        }
        return {
            valid: isValid,
            dirty: numberMeta.value.dirty || unitMeta.dirty,
        };
    });
    const computedValue = computed(() => {
        const group = groupUnits.value.find((u: Record<'label' | 'symbol' | 'conversion', any>) => u.label == validatedUnit.value?.label);
        const conversion = group?.conversion ?? 1;
        return {
            value: numberMeta.value.value,
            unit: validatedUnit.value?.label || '',
            normalized: numberMeta.value.value * conversion,
            // baseunit: unitGrp,
        };
    });
</script>

<style lang="scss" scoped>
    .si-unit-wrapper {
        height: 400px;
    }
</style>