<template>
    <div
        :id="id"
        ref="toastRef"
        class="toast"
        :class="toastClasses"
        role="alert"
        aria-atomic="true"
        aria-live="assertive"
        :data-bs-autohide="autohide"
        :data-bs-delay="duration"
    >
        <div
            v-if="!simple"
            class="toast-header"
        >
            <span
                v-if="iconDef"
                class="badge rounded-pill me-2"
                :class="badgeClass"
            >
                <FontAwesomeIcon :icon="iconDef" />
            </span>
            <strong class="me-auto">
                {{ title }}
            </strong>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
            />
        </div>
        <div class="d-flex align-items-center">
            <div class="toast-body">
                {{ message }}
            </div>
            <button
                v-if="simple"
                type="button"
                class="btn-close me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
            />
        </div>
        <div
            v-if="autohide"
            class="progress rounded-0"
            style="height: 1px;"
            role="progressbar"
            aria-label="Basic example"
            :aria-valuenow="progressWidth"
            aria-valuemin="0"
            aria-valuemax="100"
        >
            <div class="progress-bar" :style="`width: ${progressWidth}%`"></div>
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import {
        computed,
        nextTick,
        ref,
    } from 'vue';

    import {
        Toast,
    } from 'bootstrap';

    import type { ToastProps } from './definitions';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import {
        faCheck,
        faInfoCircle,
        faExclamationTriangle,
        faTimes,
        IconDefinition,
    } from '@fortawesome/free-solid-svg-icons';

    const toastRef = ref<HTMLElement | null>(null);

    const props = withDefaults(defineProps<ToastProps>(), {
        id: 'toast',
        icon: false,
        simple: false,
        message: 'Toast content',
        title: 'Toast Title',
        duration: 50000,
        autohide: true,
        channel: 'info',
        hideTimeout: false,
    });

    let timeoutRemain = ref(props.duration);
    let timeoutId: number | undefined;
    const TIMEOUT_INTERVAL = 1000; // in ms

    nextTick(() => {
        // Tells TypeScript that toastRef is not null here
        const toastInstance = new Toast(toastRef.value!);
        timeoutId = window.setInterval(() => {
            timeoutRemain.value -= TIMEOUT_INTERVAL;
            if(timeoutRemain.value <= 0) {
                window.clearInterval(timeoutId);
            }
        }, TIMEOUT_INTERVAL);
        toastInstance.show();
    });

    const progressWidth = computed(() => {
        return (timeoutRemain.value / props.duration) * 100;
    });

    const iconDef = computed(() => {
        let definition: IconDefinition | undefined;
        if(!props.icon) {return;}

        switch(props.channel) {
            case 'success':
                definition = faCheck;
                break;
            case 'info':
                definition = faInfoCircle;
                break;
            case 'warning':
                definition = faExclamationTriangle;
                break;
            case 'danger':
                definition = faTimes;
                break;
        }

        return definition;
    });

    const badgeClass = computed(() => {
        if(!props.icon) {return;}

        return `bg-${props.channel}`;
    });

    const toastClasses = computed(() => {
        let classes: Array<string> = ['border-0'];
        switch(props.channel) {
            case 'success':
                classes.push('bg-success', 'text-white');
                break;
            case 'info':
                classes.push('bg-info', 'text-dark');
                break;
            case 'warning':
                classes.push('bg-warning', 'text-dark');
                break;
            case 'danger':
                classes.push('bg-danger', 'text-white');
                break;
            case 'primary':
                classes.push('bg-primary', 'text-white');
                break;
            case 'secondary':
                classes.push('bg-secondary', 'text-white');
                break;
            case 'dark':
                classes.push('bg-dark', 'text-white');
                break;
            default:
                // use default bootstrap styling for unsupported/non-existing channel
                classes = [];
        }

        if(!props.hideTimeout && props.autohide) {
            classes.push('rounded-bottom-0');
        }

        return classes;
    });
</script>