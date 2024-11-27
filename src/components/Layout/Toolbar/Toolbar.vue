<template>
    <div class="toolbar d-flex">
        <slot name="left">
            <div class="flex-fill"></div>
        </slot>
        <slot name="center"></slot>
        <slot name="right">
            <div class="d-flex gap-2 flex-fill justify-content-end">
                <LoadingButton color="secondary" :loading="false">
                    {{ t('global.cancel') }}
                </LoadingButton>
                <LoadingButton color="primary" class="px-5" :loading="false">
                    {{ t('global.save') }}
                </LoadingButton>
            </div>
        </slot>
    </div>
</template>

<script setup lang="ts">
    import LoadingButton from '../../Button/LoadingButton/LoadingButton.vue';

    import { useI18n } from 'vue-i18n';
    const { t } = useI18n();

</script>