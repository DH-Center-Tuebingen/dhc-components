<template>
    <div class="d-flex flex-column align-items-center w-100">
        <div class="input-group w-100">
            <input
                :id="name"
                v-model.number="validatedValue"
                type="range"
                class="form-range form-control bg-white px-2"
                :disabled="disabled"
                :name="name"
                :min="metadata.min"
                :max="metadata.max"
                :step="stepSize"
                @change="handleInput"
                @keydown="handleKeydown"
                @keyup="handleKeyup"
                @wheel.stop.prevent="handleScroll"
            >
            <span class="input-group-text value-display justify-content-center">
                {{ validatedValue }}
                {{ metadata.unit }}
            </span>
            <!-- <button
                class="btn btn-outline-secondary"
                type="button"
                @click="visualize = !visualize"
            >
                <FontAwesomeIcon
                    v-show="visualize"
                    :icon="faEyeSlash"
                    class="fa-fw"
                />
                <FontAwesomeIcon
                    v-show="!visualize"
                    :icon="faEye"
                    class="fa-fw"
                />
            </button> -->
        </div>
        <!-- <span
            v-show="visualize"
            class="mt-1"
        >
            {{ validatedValue }}
            {{ metadata.unit }}
        </span> -->
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, } from 'vue';

    import { useField } from 'vee-validate';

    import { initI18n } from '../../../i18n/i18n';

    import { number } from '../validation/rulesets';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    // import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    // import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

    import { RangeProps } from './definitions';

    const props = withDefaults(defineProps<RangeProps>(), {
        name: 'Range',
        defaultValue: '',
        metadata: {
            min: 0,
            max: 100,
            step: 1,
            unit: '%',
        } as any
    });

    const emit = defineEmits(['change']);

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;
    const multiplier = ref<number>(1);
    // const visualize = ref<boolean>(false);

    const setInitialValue = () => {
        return props.defaultValue || '';
    };

    const reset = (value: number | string) => {
        value = value || props.defaultValue;
        resetField({
            value: value,
        });
    };

    const undirty = (value: number | string) => {
        value = value || validatedValue.value;
        reset(value);
    };

    const handleChange = (value: number) => {
        validatedValue.value = value;
        validateChange(validatedValue.value);
        console.log("[Range]", meta.valid, meta.dirty, validatedValue.value);
        emit('change', {
            valid: meta.valid,
            dirty: meta.dirty,
            value: validatedValue.value,
        });
    };

    const handleInput = (event: Event) => {
        const value = Number((event.target as HTMLInputElement).value);
        handleChange(value);
    }

    const handleKeydown = (event: KeyboardEvent) => {
        if(event.key === 'Shift') {
            multiplier.value = 10;
        }
    };

    const handleKeyup = (event: KeyboardEvent) => {
        if(event.key === 'Shift') {
            multiplier.value = 1;
        }
    };

    const handleScroll = (event: WheelEvent) => {
        const delta = event.deltaY < 0 ? stepSize.value : -stepSize.value;
        console.log("scrolling",
                validatedValue.value,
                Number(validatedValue.value),
                delta,
                event.deltaY,
                stepSize,
                props,
                multiplier.value
        )
        let updatedValue = Number(validatedValue.value) + delta;
        updatedValue = Math.min(
            Math.max(
                props.metadata.min,
                updatedValue
            ),
            props.metadata.max,
        );
        handleChange(updatedValue);
    };

    const stepSize = computed(() => props.metadata.step * multiplier.value);

    let rules = number();
    if(props.required) {
        rules = rules.required();
    }
    const {
        value: validatedValue,
        meta,
        resetField,
        handleChange: validateChange,
    } = useField(`range_${props.name}`, rules, {
        initialValue: setInitialValue(),
    });
</script>

<style scoped>
    input[type="range"] {
        height: inherit;
    }

    .value-display {
        width: 6rem;
    }
</style>