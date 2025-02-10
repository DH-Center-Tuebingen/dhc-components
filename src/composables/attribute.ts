import { computed } from 'vue'
import { useField } from 'vee-validate'

export const useAttribute = (name: string, activeValue: any, validationRule: any = null) => {

    const {
        errorMessage,
        errors,
        meta,
        resetField,
        value,
    } = useField(name, validationRule, {
        initialValue: activeValue,
    })

    const field = computed(() => {
        return {
            value: value.value,
            meta: meta,
        }   
    });

    const isDirty = computed(() => {
        return meta.dirty
    })

    const isValidated = computed(() => {
        return meta.validated
    })

    const hasErrors = computed(() => {
        if (!errors) { return false }
        return errors.value.length > 0
    });

    return {
        errorMessage,
        hasErrors,
        isDirty,
        isValidated,
        meta,
        resetField,
        value,
        field,
    }
}