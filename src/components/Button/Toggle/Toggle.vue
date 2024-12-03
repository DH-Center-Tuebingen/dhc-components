<template>
    <button
        class="btn"
        :class="buttonClasses"
        @click="toggle"
    >
        <slot :value="value"></slot>
    </button>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    interface ToggleProps {
        color: string;
    }

    const props = withDefaults(defineProps<ToggleProps>(), {
        color: 'primary'
    });

    const value = defineModel({ required: true });

    const toggle = () => {
        value.value = !value.value;
    }

    const buttonClasses = computed(() => {

        if (value.value) {
            return `btn-${props.color} active`;
        } else {
            return `btn-outline-${props.color}`;
        }
    });
</script>