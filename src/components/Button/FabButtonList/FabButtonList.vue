<template>
    <div
        class="btn-fab-list btn-fab-list-sm gap-1 bg-white rounded px-1 py-1 d-inline-flex flex-align-center">
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
    import { ButtonColors } from 'src/types/Colors';
    
    interface FabButton {
        icon: IconDefinition;
        title?: string;
        classes?: string;
        color?: ButtonColors;
        action: Function;
        active?: boolean;
    }

    defineProps<{
        size?: FabButtonSize;
        buttons: FabButton[];
    }>();

</script>


