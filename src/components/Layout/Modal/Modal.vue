<template>
    <vue-final-modal
        class="modal-container modal"
        content-class="sp-modal-content sp-modal-content-xs"
        name="user-info-modal"
        :model-value="props.modelValue"
        @update:modelValue="close"
    >
        <div class="sp-modal-content sp-modal-content-xs">
            <header class="modal-header d-flex justify-content-between">
                <div>
                    <slot name="header"></slot>
                </div>
                <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    data-bs-dismiss="modal"
                    @click="close"
                />
            </header>
            <div class="modal-body">
                <slot />
            </div>
            <footer class="modal-footer">
                <slot name="footer"></slot>
                <button
                    type="button"
                    class="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                    @click="close"
                >
                    <i class="fas fa-fw fa-times" /> {{ t('global.close') }}
                </button>
            </footer>
        </div>

    </vue-final-modal>
</template>

<script
    lang='ts'
    setup
>
    import { useI18n } from 'vue-i18n';
    import { VueFinalModal } from 'vue-final-modal';

    const props = defineProps<{
        modelValue: boolean;
    }>();

    const emit = defineEmits<{
        'update:modelValue': [boolean];
    }>();


    function close() {
        emit('update:modelValue', false);
    }

    const t = useI18n().t;

</script>
