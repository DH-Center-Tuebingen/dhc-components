<template>
    <span
        v-if="message"
        class="text-danger font-weight-bold"
    >
        {{ message }}
    </span>
</template>

<script lang="ts" setup>
    defineProps<{
        message: string,
    }>();
</script>