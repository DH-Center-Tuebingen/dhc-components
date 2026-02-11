<template>
    <Modal
        v-bind="props"
        :show="show"
        @close="emit('close')"
    >
        <template #header>
            <h5 class="modal-title">Example Modal with custom events</h5>
        </template>
        <p>
            This example modal overrides the default <code>@close</code> action and also implements it's own <code>@test</code> action.
        </p>
        <div class="d-flex flex-row align-items-center justify-content-center">
            <button class="btn btn-outline-primary" @click="emit('test')">
                Fire Test Event
            </button>
        </div>
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
        (e: 'test'): void;
    }>();
</script>