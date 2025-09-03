<template>
    <div
        class="fa-stack"
        :class="wrapperClasses"
    >
        <FontAwesomeIcon
            v-for="(icon, index) in data?.items || []"
            :key="`icon-stack-${index}`"
            :icon="icon.icon"
            :transform="(icon.transforms || []).join(' ')"
            :style="icon.style || {}"
            :size="size"
            :fixed-width="fixedWidth"
        />
    </div>
</template>

<script
    setup
    lang="ts"
>
    import { computed } from 'vue';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import type { SizeProp } from '@fortawesome/fontawesome-svg-core';
    import { StackedIcon } from './definitions';

    const props = withDefaults(defineProps<{
        data?: StackedIcon;
        size?: SizeProp;
        fixedWidth?: boolean;
    }>(), {
        iconCategories: () => [],
        fixedWidth: true,
    });

    const wrapperClasses = computed(() => {
        const classes = [props.data?.type];

        if(props.data?.classes) {
            classes.push(...props.data.classes);
        }

        return classes;
    });
</script>