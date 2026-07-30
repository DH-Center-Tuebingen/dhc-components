<template>
    <Transition :name="animation">
        <div
            v-if="active"
            class="position-fixed top-0 start-0 w-100 h-100 d-flex"
        >
            <div
                class="file-drop-frame m-2 d-flex flex-fill justify-content-center align-items-center text-body-tertiary bg-light bg-opacity-75 border border-1 rounded"
                style="border-style: dashed !important;"
            >
                <span class="d-flex justify-content-center align-items-center gap-3 p-1 px-4 rounded">
                    <FontAwesomeIcon
                        :icon="faFileArrowUp"
                        size="2x"
                    />
                    <span
                        class="fw-bold"
                        style="font-size: 1.5rem;"
                    >
                        {{ text }}
                    </span>
                </span>
            </div>
        </div>
    </Transition>
</template>

<script
    setup
    lang="ts"
>
    import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    withDefaults(defineProps<{
        text?: string;
        active?: boolean;
        animation?: string;
    }>(), {
        active: true,
        text: 'Drop files here',
        animation: 'zoom'
    });

</script>

<style scoped>

    .zoom-enter-active {
        animation: zoom 0.5s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .zoom-leave-active {
        animation: zoom 0.5s cubic-bezier(1, 0.5, 0.8, 1) reverse;
    }

    .zoom-enter-from,
    .zoom-leave-to {
        opacity: 0;
    }


    @keyframes zoom {
        0% {
            transform: scale(50%) Rotate(3deg);
            opacity: 0;
        }

        100% {
            transform: scale(100%) Rotate(0deg);
            opacity: 1;
        }
    }

</style>