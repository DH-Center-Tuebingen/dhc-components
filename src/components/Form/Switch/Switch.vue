<template>
    <div class="form-check form-switch">
        <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            :id="uid"
            v-model="model"
            :disabled="disabled"
        >
        <label
            v-if="$slots.default"
            class="form-check-label user-select-none"
            :for="uid"
        >
            <slot />
        </label>
    </div>
</template>

<script setup lang="ts">

    type SwitchProps = {
        uid: string
        disabled ?: boolean
    }

    withDefaults(defineProps<SwitchProps>(), {
        disabled: false,
    });

    const model = defineModel();
</script>

<style lang='scss' scoped></style>