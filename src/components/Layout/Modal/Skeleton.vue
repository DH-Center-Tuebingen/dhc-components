<template>
    <Teleport to="body">
        <Transition>
            <div
                v-if="show"
                class="backdrop position-absolute w-100 h-100 bg-dark bg-opacity-25 top-0 start-0"
                @click.left="handleOutsideClick"
            >
                <div class="modal d-block">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div
                            class="modal-content"
                            @click.stop
                        >
                            <div class="modal-header">
                                <slot name="header"></slot>
                                <button
                                    type="button"
                                    class="btn-close"
                                    aria-label="Close"
                                    @click="emit('close')"
                                />
                            </div>
                            <div class="modal-body">
                                <slot></slot>
                            </div>
                            <div class="modal-footer">
                                <slot name="footer">
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        @click="emit('close')"
                                    >
                                        {{ t('global.close') }}
                                    </button>
                                </slot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script
    setup
    lang="ts"
>
    import {
        onBeforeUnmount,
        onMounted,
    } from 'vue';

    import { initI18n } from '@/i18n/i18n';

    import { ModalOptions } from '@/composables/modal';

    // we can not use global i18n here, so we have to call initI18n
    // and use empty message objects for all supported/desired languages
    // and set `extendGlobal` to true
    const i18n = initI18n({
        de: {},
        en: {},
    }, true);
    //@ts-ignore
    const t = i18n.global.t;

    const props = withDefaults(defineProps<ModalOptions>(), {
        show: false,
        closeOnOutsideClick: true,
        closeOnEsc: true,
    });

    const emit = defineEmits<{
        (e: 'close'): void
    }>();

    const handleOutsideClick = () => {
        if(props.closeOnOutsideClick) {
            emit('close');
        }
    };

    const handleEscape = (event: KeyboardEvent) => {
        if(event.key === 'Escape') {
            emit('close');
        }
    };

    onMounted(() => {
        if(props.closeOnEsc) {
            window.addEventListener('keydown', handleEscape);
        }
    });

    onBeforeUnmount(() => {
        if(props.closeOnEsc) {
            window.removeEventListener('keydown', handleEscape);
        }
    });
</script>

<style lang="scss">
    .backdrop {
        user-select: none;
    }

    .modal-content {
        user-select: text;
    }

    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.25s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>