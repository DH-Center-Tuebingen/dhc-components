<template>
    <div class="input-group">
        <input
            v-model="v.value"
            class="form-control"
            :disabled="disabled"
            type="text"
            :placeholder="t('attribute.wkt.add')"
        >

        <button
            type="button"
            class="btn btn-outline-secondary"
            :disabled="disabled"
            @click="openGeographyModal()"
        >
            <FontAwesomeIcon :icon="faLocationDot" :fixed-width="true"/>
        </button>
    </div>
</template>

<script setup lang="ts">
    import {
        reactive,
        watch
    } from 'vue';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
    import { useField } from 'vee-validate';

    import * as yup from 'yup';

    import { useI18n } from 'vue-i18n';



    // import {
    //     showMapPicker
    // } from '@/helpers/modal.js';

    const props = defineProps<{
        disabled?: boolean;
        value: string;
    }>();

    const emit = defineEmits(['change']);

    const { t } = useI18n();

    // FETCH

    // FUNCTIONS
    const updateValue = (newValue: string) => {
        v.handleChange(newValue);
    };
    const openGeographyModal = () => {
        console.error('openGeographyModal() not implemented');
        // showMapPicker({
        //     value: v.value,
        // }, updateValue);
    };
    const resetFieldState = () => {
        v.resetField({
            value: props.value
        });
    };
    const undirtyField = () => {
        v.resetField({
            value: v.value,
        });
    };

    // DATA
    const {
        handleChange,
        value: fieldValue,
        meta,
        resetField,
    } = useField(`wkt`, yup.string(), {
        initialValue: props.value,
    });
    const v = reactive({
        handleChange,
        value: fieldValue,
        meta,
        resetField,
    });

    watch(() => props.value, (newValue, oldValue) => {
        resetFieldState();
    });
    watch(() => v.value, (newValue, oldValue) => {
        // only emit @change event if field is validated (required because Entity.vue components)
        // trigger this watcher several times even if another component is updated/validated
        if (!v.meta.validated) { return; }
        emit('change', {
            dirty: v.meta.dirty,
            valid: v.meta.valid,
            value: v.value,
        });
    });

</script>