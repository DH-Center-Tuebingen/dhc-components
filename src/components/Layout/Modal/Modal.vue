<template>
    <div class="d-flex flex-column gap-2">
        <button type="button" class="btn btn-primary" @click="openModalWithTestEvent">
            Open Modal with Test Action
        </button>
        <button type="button" class="btn btn-primary" @click="openModalWithoutCloseHandlers">
            Open Modal without close handlers
        </button>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import { useModal } from '@/composables/modal';

    import ModalWithCustomEvent from './ModalWithCustomEvent.vue';
    import ModalWithoutClickClose from './ModalWithoutClickClose.vue';

    const openModalWithTestEvent = () => {
        const modal = useModal(ModalWithCustomEvent, {
            onClose: () => {
                modal.hide(true);
                alert('Custom @close action that hides the modal');
            },
            onTest: () => {
                alert('Custom @test action that does nothing');
            },
            show: false,
            closeOnOutsideClick: true,
            closeOnEsc: true,
        });
        modal.show();
    };

    const openModalWithoutCloseHandlers = () => {
        const modal = useModal(ModalWithoutClickClose, {
            show: false,
            closeOnOutsideClick: false,
            closeOnEsc: false,
        });
        modal.show();
    };
</script>

<style lang="scss">
</style>