<template>
    <Multiselect
        v-model="value"
        :options="options"
        :mode="mode"
        :searchable="searchable"
        :class="{
            clear: 'multiselect-clear multiselect-clear-reset'
        }"
    />
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect';

const props = withDefaults(defineProps<{
    initialValue?: any;
    multiple?: boolean;
    options?: any[];
    searchable?: boolean;
}>(),{
    searchable: true,
    multiple: false,
});

const value = defineModel({required: true});
const mode = props.multiple ? 'tags' : 'single';
</script>

<style src="@vueform/multiselect/themes/default.css"></style>