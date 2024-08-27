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
            <i
                class="fas"
                :class="iconClasses"
            ></i>
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

<script lang="ts" setup>

    export type AlertType = 'success' | 'note' | 'info' | 'warning' | 'error' | 'mono';

    import { computed } from 'vue';
    const props = defineProps<{
        message: string
        type?: AlertType
        noicon?: boolean
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
        return !props.noicon && supportsIcon;
    }),

        hasIconText = computed(_ => {
            return hasIcon.value && props.icontext;
        })

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
    })

    const iconClasses = computed(_ => {
        let classes: String[] = [];
        if (!hasIcon.value) { return classes; }
        switch (props.type) {
            case 'success':
                classes.push('fa-check');
                break;
            case 'note':
                classes.push('fa-lightbulb');
                break;
            case 'info':
                classes.push('fa-info-circle');
                break;
            case 'warning':
                classes.push('fa-exclamation-triangle');
                break;
            case 'error':
                classes.push('fa-times');
                break;
        }
        if (hasIconText.value) {
            classes.push('me-2');
        }
        return classes;
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