<template>
    <vue-final-modal
        class="modal-container modal"
        content-class="sp-modal-content sp-modal-content"
        name="user-info-modal"
        :focus-trap="false"
        @update:modelValue="close"
    >
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
                tabindex="0"
            >
                <i class="fas fa-fw fa-times" /> {{ t('global.close') }}
            </button>
        </footer>
    </vue-final-modal>
</template>

<script lang='ts' setup>
    import { useI18n } from 'vue-i18n';
    import { VueFinalModal } from 'vue-final-modal';

    const emit = defineEmits<{
        'close': [];
    }>();


    function close() {
        emit('close');
    }

    const t = useI18n().t;

</script>
