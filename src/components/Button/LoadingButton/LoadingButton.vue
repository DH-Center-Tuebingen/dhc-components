<template>
    <button
        class="position-relative d-flex align-items-center justify-content-center"
        :class="buttonClass"
        style="width: 120px;"
        role="button"
        :disabled="loading"
    >
        <span
            v-if="loading"
            class="position-absolute top-50 start-50 translate-middle"
        >
            <Spinner :size="'lg'" />
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
    import Spinner from '../../Spinner/Spinner.vue';
    import { ColorName } from '../../../types/Colors';
    const props = defineProps<{
        outlined?: boolean
        color?: ColorName
        loading: boolean
    }>();

    const contentClass = computed(_ => {
        return {
            'opacity-0': props.loading,
        };
    });

    const buttonClass = computed(_ => {
        const color = props.color ?? 'dark';
        const baseName = props.outlined ? 'btn-outline' : 'btn';
        return `btn ${baseName}-${color}`;
    })

</script>