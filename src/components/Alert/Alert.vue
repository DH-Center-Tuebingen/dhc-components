<template>
    <div
        class="alert"
        :class="classes"
        role="alert"
    >

        <div
            v-if="hasIcon"
            :class="iconWrapperClasses"
        >
            <FontAwesomeIcon :icon="icon" />
            <span class="fw-medium">
                {{ icontext }}
            </span>
        </div>
        <div
            class="alert-message"
            v-html="message"
        ></div>
    </div>
</template>

<script
    lang="ts"
    setup
>

    export type AlertType = 'success' | 'note' | 'info' | 'warning' | 'error' | 'mono';

    import { computed } from 'vue';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import {
        faCheckCircle,
        faInfoCircle,
        faExclamationTriangle,
        faExclamationCircle,
        IconDefinition
    } from '@fortawesome/free-solid-svg-icons';
    

    const props = defineProps<{
        message: string
        type?: AlertType
        showIcon?: boolean
        icontext?: string
    }>();

    const supportsIcon = computed(_ => {
        switch (props.type) {
            case 'success':
            case 'note':
            case 'info':
            case 'warning':
            case 'error':
                return true;
            case 'mono':
            default:
                return false;
        }
    })

    const hasIcon = computed(_ => {
        return props.showIcon && supportsIcon.value;
    });

    const hasIconText = computed(_ => {
        return hasIcon.value && props.icontext;
    });

    const classes = computed(_ => {
        let classes = [];

        type Map = {
            [key: string]: string;
        }

        const classMap: Map = {
            success: 'success',
            note: 'info',
            info: 'info',
            warning: 'warning',
            error: 'danger',
            mono: 'secondary',
        }

        let classType = 'primary'
        if (classMap[props.type as string]) { classType = classMap[props.type as string]; }

        let typeClass = `alert-${classType}`;
        classes.push(typeClass);


        if (hasIcon.value) {
            classes.push('d-flex');
            if (hasIconText.value) {
                classes.push('flex-column');
            } else {
                classes.push('flex-row');
            }
        }

        return classes;
    });

    const icon = computed<IconDefinition>(() => { 
        switch (props.type) {
            case 'success':
                return faCheckCircle;
            case 'note':
            case 'info':
                return faInfoCircle;
            case 'warning':
                return faExclamationTriangle;
            case 'error':
                return faExclamationCircle;
            default:
                console.warn('No icon for type:', props.type);
                return faInfoCircle;
        }
    })

    const iconWrapperClasses = computed(_ => {
        let classes: String[] = [];
        if (!hasIcon.value) { return classes; }
        if (!hasIconText.value) {
            classes.push('me-2');
        }
        return classes;
    })

</script>