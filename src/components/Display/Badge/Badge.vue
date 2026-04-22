<template>
    <span
        class="badge"
        :class="classes"
    >
        {{ content }}
    </span>
</template>

<script
    setup
    lang="ts"
>
    import { computed } from 'vue';

    import { BadgeProps } from './definitions';

    const props = withDefaults(defineProps<BadgeProps>(), {
        styling: 'rounded',
        color: 'primary',
        outline: false,
    });

    const classes = computed(() => {
        const classList: string[] = [];

        if(props.outline) {
            classList.push('border');
            classList.push(`border-${props.color}`);
            classList.push(`text-${props.color}`);
            classList.push('bg-transparent');
        } else {
            classList.push(`text-bg-${props.color}`);
        }

        if(props.styling == 'pill') {
            classList.push('rounded-pill');
        } else if(props.styling == 'unrounded') {
            classList.push('rounded-0');
        }

        return classList;
    });
</script>

<style lang="scss">
</style>