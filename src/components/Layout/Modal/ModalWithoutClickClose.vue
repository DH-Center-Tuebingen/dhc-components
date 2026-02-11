<template>
    <Modal
        v-bind="props"
        :show="show"
        @close="emit('close')"
    >
        <template #header>
            <h5 class="modal-title">Modal without additional Close Actions</h5>
        </template>
        <p>
            This example disabled the <code>closeOnOutsideClick</code> and <code>closeOnEsc</code> action handlers.
        </p>
    </Modal>
</template>

<script
    setup
    lang="ts"
>
    import { ModalOptions } from '@/composables/modal';
    import Modal from './Skeleton.vue';

    const props = defineProps<ModalOptions>();

    const emit = defineEmits<{
        (e: 'close'): void;
    }>();
</script>