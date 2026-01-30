<template>
    <div
        class="btn-fab-list d-inline-flex flex-align-center"
        :class="customClasses"
    >
        <FabButtonComponent
            v-for="(value, index) in buttons"
            :key="index"
            :class="value.classes"
            :action="value.action"
            :active="value.active"
            :color="value.color"
            :icon="value.icon"
            :size="size"
            :title="value.title"
        ></FabButtonComponent>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import type {
        IconDefinition
    } from '@fortawesome/free-solid-svg-icons';

    import FabButtonComponent, { FabButtonSize } from '../FabButton/FabButton.vue';
    import { ColorName } from 'src/types/Colors';

    interface FabButton {
        icon: IconDefinition;
        title?: string;
        classes?: string;
        color?: ColorName;
        action: Function;
        active?: boolean;
    }

    withDefaults(defineProps<{
        size?: FabButtonSize;
        customClasses?: string;
        buttons: FabButton[];
    }>(), {
        size: 'md',
        customClasses: 'bg-white gap-1 px-2 py-1 rounded-pill'
    });
</script>


