<template>
    <span
        class="separator border-start border-1 border-separator"
        :class="{
            'text-separator': isTextSeparator,
        }"
    />
</template>

<script lang="ts" setup>

defineProps({
    isTextSeparator: {
        type: Boolean,
    },
});

</script>