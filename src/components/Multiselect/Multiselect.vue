<template>
    <Multiselect
        v-model="validatedValue"
        class="overflow-hidden text-nowrap"
        :classes="{clear: 'multiselect-clear multiselect-clear-reset'}"
        :value-prop="metadata.valueProp"
        :label="metadata.label"
        :object="metadata.asObject"
        :mode="mode"
        :options="options"
        :name="name"
        :placeholder="placeholder"
        :no-options-text="metadata.optionsPlaceholder"
        :no-results-text="metadata.resultsPlaceholder"
        :limit="metadata.limit"
        :hide-selected="metadata.hideSelected"
        :disabled-prop="metadata.disabledProp"
        :searchable="metadata.searchable"
        :track-by="metadata.trackBy"
        :search-filter="metadata.customSearch"
        :appendToBody="true"
        @change="handleChange"
    >
        <template #option="{ option }">
            <slot name="option" :option="option">
            </slot>
        </template>
        <template #singlelabel="{ value }">
            <slot name="singlelabel" :value="value">
            </slot>
        </template>
        <template #tag="{ option, handleTagRemove, disabled }">
            <slot name="tag" :option="option" :handleTagRemove="handleTagRemove" :disabled="disabled">
            </slot>
        </template>
    </Multiselect>
</template>

<script setup lang="ts">
    import { useField } from 'vee-validate';

    import { mixed } from '../Form/validation/rulesets';

    import { MultiSelectOptions } from './definitions';

    import Multiselect from '@vueform/multiselect';

    const props = withDefaults(defineProps<{
        options: Array<any>,
        name: string,
        disabled?: boolean,
        defaultValue?: string | number | Array<any> | Record<string, any>,
        placeholder?: string,
        metadata?: MultiSelectOptions,
        multiple?: boolean,
    }>(), {
        disabled: false,
        defaultValue: () => ({}),
        placeholder: 'Select an option',
        metadata: () => ({
            asObject: true,
            valueProp: 'value',
            label: 'label',
            trackBy: ['id', 'label', 'value'],

        }),
        multiple: false,
    });

    const emit = defineEmits(['change']);

    const reset = (value: string | number | Array<any> | Record<string, any>) => {
        resetField({
            value: value,
        });
    };

    const undirty = (value: string | number | Array<any> | Record<string, any>) => {
        value = value || validatedValue;
        reset(value);
    };

    const handleChange = (selectedOption: string | number | Array<any> | Record<string, any>) => {
        validatedValue.value = selectedOption;
        emit('change', {
            dirty: meta.dirty,
            valid: meta.valid,
            value: validatedValue.value,
        });
    };

    const {
        value: validatedValue,
        meta,
        resetField,
    } = useField(`multiselect_${props.name}`, mixed(), {
        initialValue: props.defaultValue,
    });

    const mode = props.multiple ? 'tags' : 'single';
</script>

<style src="@vueform/multiselect/themes/default.css"></style>