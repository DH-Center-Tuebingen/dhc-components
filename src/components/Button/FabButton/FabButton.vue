<template>
    <IconButton
        class="btn-fab"
        :class="buttonClass"
        :button-class="color"
        :title="title"
        :outlined="!active"
        :action="action"
    >
        <template #icon>
            <slot name="icon">
                <FontAwesomeIcon
                    :icon="icon"
                />
            </slot>
        </template>
    </IconButton>
</template>

<script
    setup
    lang="ts"
>
    export type FabButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

    import type {
        IconDefinition
    } from '@fortawesome/free-solid-svg-icons';

    import { computed } from 'vue';
    import IconButton from '../IconButton/IconButton.vue';
    import { ButtonColors } from 'src/types/Colors';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    /**
     * Props
     * @property {IconDefinition} icon - The icon to display inside the FAB button
     * @property {string} [title] - Optional title for the button
     * @property {Function} action - The function to call when the button is clicked
     * @property {Size} [size='md'] - The size of the FAB button
     * @property {boolean} [active=false] - Whether the button is in an active
     */
    const {
        size = 'md',
        color = 'secondary',
    } = defineProps<{
        icon: IconDefinition;
        title?: string;
        action: Function;
        size?: FabButtonSize;
        active?: boolean;
        color?: ButtonColors;
    }>();

    const buttonClass = computed(() => {
        return size != 'md' ? `btn-${size}` : '';
    });
</script>

<style
    lang="scss"
    scoped
>
    @use "@scss/utils/shape";
</style>