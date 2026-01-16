<template>
    <LoadingButton
        class="btn btn-fab"
        :class="buttonClass"
        :color="color"
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
    </LoadingButton>
</template>

<script
    setup
    lang="ts"
>
    export type FabButtonSize = 'sm' | 'md' | 'lg' | 'xl';

    import type {
        IconDefinition
    } from '@fortawesome/free-solid-svg-icons';

    import { computed } from 'vue';
    import LoadingButton from '../LoadingButton/LoadingButton.vue';
    import { ColorName } from 'src/types/Colors';
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
        color?: ColorName
    }>();

    const buttonClass = computed(() => {
        return `btn-fab-${size}`;
    });
</script>

<style
    lang="scss"
    scoped
>
    @use "@scss/utils.scss";

    .btn-fab {
        padding: 0;
        @include utils.circle(1.8rem);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-fab:disabled {
        // background-color: $gray-200;
        opacity: 1;
    }

    .btn-fab-list-sm > .btn-fab,
    .btn-fab-sm {
        @include utils.circle(1.25rem);
        padding: 0;
        font-size: 0.7rem;
        line-height: normal;
    }

    .btn-fab-list-md > .btn-fab {
        @include utils.circle(1.5rem);
        padding: 0;
        font-size: 0.9rem;
        line-height: normal;
    }

    .btn-fab-lg {
        @extend .btn-fab;
        @include utils.circle(2.5rem);
        font-size: 1.2rem;
    }

    .btn-fab-xl {
        @extend .btn-fab;
        @include utils.circle(4rem);
        font-size: 2.3rem;
    }
</style>