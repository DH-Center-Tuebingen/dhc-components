<template>
    <textarea
        class="form-control"
        style="resize: none;"
        ref="textarea"
        v-model="value"
    ></textarea>
</template>

<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';

    const value = defineModel<string>()
    const textarea = ref<HTMLTextAreaElement | null>(null);

    const updateHeight = () => {
        if (textarea.value) {
            textarea.value.style.height = 'auto';
            textarea.value.style.height = `${textarea.value.scrollHeight + 2}px`; // +2 to prevent scrollbars
        }
    };

    onMounted(() => updateHeight());
    watch(() => value.value, () => updateHeight());
</script>