<template>
    <button
        class="position-relative d-flex align-items-center justify-content-center"
        :class="buttonClass"
        role="button"
        :disabled="loading"
    >
        <span
            v-if="loading"
            class="position-absolute top-50 start-50 translate-middle"
        >
            <LoadingSpinner :size="'lg'" />
        </span>
        <slot
            v-else
            name="icon"
        ></slot>

        <span :class="contentClass">
            <slot></slot>
        </span>
    </button>
</template>

<script lang="ts" setup>
    import { computed } from 'vue';
    import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.vue';
    import { ColorName } from '../../../types/Colors';
    const props = defineProps<{
        outlined?: boolean
        color?: ColorName
        loading: boolean
        small?: boolean
    }>();

    const contentClass = computed(_ => {
        return {
            'opacity-0': props.loading,
        };
    });

    const buttonClass = computed(_ => {
        const color = props.color ?? 'dark';
        const baseName = props.outlined ? 'btn-outline' : 'btn';
        const small = props.small ? 'btn-sm' : '';
        return `btn ${baseName}-${color} ${small}`;
    })

</script>