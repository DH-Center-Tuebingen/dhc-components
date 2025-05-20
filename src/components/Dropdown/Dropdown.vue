<template>
    <Multiselect v-bind="props" :appendToBody="true" />
</template>

<script setup lang="ts">
    import Multiselect from '@vueform/multiselect';

    const props = defineProps({
        options: {
            type: Array,
            required: true,
        },
        value: {
            type: [String, Number, Array],
            default: null,
        },
        placeholder: {
            type: String,
            default: 'Select an option',
        },
        multiple: {
            type: Boolean,
            default: false,
        },
    });
</script>

<style src="@vueform/multiselect/themes/default.css"></style>