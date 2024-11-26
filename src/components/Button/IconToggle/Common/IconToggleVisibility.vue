<template>
    <IconToggle
        :activeIcon="faEye"
        :inactiveIcon="faEyeSlash"
        v-model="value"
    />
</template>

<script setup>
    import IconToggle from '../IconToggle.vue';
    import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
    const value = defineModel()
</script>