<template>
    <input
        :id="name"
        class="form-control not-allowed-handle"
        type="text"
        disabled
        readonly
        :name="name"
        :value="defaultValue"
    >
</template>

<script setup lang="ts">
    import { SerialProps } from './definitions';

    const props = withDefaults(defineProps<SerialProps>(), {
        name: 'Serial',
        disabled: false,
        required: false,
        defaultValue: '',
    });
</script>

<style scoped>
</style>