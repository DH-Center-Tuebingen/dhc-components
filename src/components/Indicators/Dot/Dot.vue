<template>
    <div
        class="dot-indicator"
        :class="mergedClasses"
        :style="size"
    />
</template>

<script setup lang="ts">
    import { computed, ModelRef, onMounted } from 'vue';

    export interface DotIndicatorProps {
        size?: string,
        type?: string,
        classes?: string,
        opacity?: number,
    }

    const props = withDefaults(defineProps<DotIndicatorProps>(), {
        size: '0.5rem',
        type: 'default',
        classes: 'rounded-circle ratio ratio-1x1',
        opacity: 4,
    });

    const value: ModelRef<string | undefined> = defineModel();

    onMounted(() => {
        value.value = props.type;
    });

    const size = computed(() => {
        return {
            width: props.size,
            height: props.size,
        };
    });

    const mergedClasses = computed(() => {
        const classes = props.classes.split(' ');
        switch(props.type) {
            case 'success':
            case 'valid':
                classes.push('bg-success');
                break;
            case 'note':
            case 'info':
                classes.push('bg-info');
                break;
            case 'warning':
                classes.push('bg-warning');
                break;
            case 'error':
            case 'danger':
                classes.push('bg-danger');
                break;
            case 'mono':
                classes.push('bg-success');
                break;
            case 'default':
            case 'primary':
            default:
                classes.push('bg-primary');
        }
        switch(props.opacity) {
            case 0:
                classes.push('invisible');
                break;
            case 1:
                classes.push('bg-opacity-10');
                break;
            case 2:
                classes.push('bg-opacity-25');
                break;
            case 3:
                classes.push('bg-opacity-50');
                break;
            case 4:
                classes.push('bg-opacity-75');
                break;
            case 5:
                classes.push('bg-opacity-100');
                break;
        }
        return classes;
    });
</script>

<style lang="scss" scoped>
</style>