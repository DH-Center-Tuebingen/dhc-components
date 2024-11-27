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

<!-- <style>
.separator {
    border-left: 1px solid currentColor;
    height: 100%;
    margin: 0 0.5rem;
    opacity: 0.3;
}

.text-separator {
    height: 1em;
}
</style> -->