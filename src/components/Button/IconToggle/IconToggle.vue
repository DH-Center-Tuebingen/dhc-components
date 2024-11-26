<template>
    <IconButton
        v-if="model"
        :icon="activeIcon"
        @click="handleClick"
        fixed-width
    />
    <IconButton
        v-else
        :icon="inactiveIcon"
        @click="handleClick"
        fixed-width
    />
</template>

<script lang="ts" setup>
    import IconButton from '../IconButton/IconButton.vue';
    import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

    defineProps<{
        activeIcon: IconDefinition,
        inactiveIcon: IconDefinition,
    }>()

    const model = defineModel()

    const handleClick = () => {
        model.value = !model.value;
    }
</script>