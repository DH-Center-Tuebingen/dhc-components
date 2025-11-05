<template>
    <div class="d-flex align-items-center text-secondary">
        <FontAwesomeIcon :icon="icon" />
        <span v-if="!iconOnly" class="ms-2 fw-bold user-select-none">{{ data }}</span>
    </div>
</template>

<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

    defineProps<{
        icon: IconDefinition;
        data: string | number;
        iconOnly?: boolean;
    }>();
</script>