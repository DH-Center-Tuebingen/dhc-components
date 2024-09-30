import Modal from '@/components/Layout/Modal/Modal.vue';
import { useModal as vfmUseModal, useModalSlot } from 'vue-final-modal';

export function useModal(component: any, attrs: any = {}) {

    const { open, close, destroy, options, patchOptions } = vfmUseModal({
        component: Modal,
        slots: {
            default: useModalSlot({
                component,
                attrs,
            })
        },
        attrs: {
            onClose: () => close()
        },
    });

    return {
        open,
        close,
        destroy,
        options,
        patchOptions,
    }
}