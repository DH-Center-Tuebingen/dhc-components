<template>
    <button
        class="position-relative d-flex align-items-center justify-content-center"
        :class="buttonClass"
        role="button"
        :disabled="loading"
        @click="exec()"
    >
        <!-- TODO: [VR]: I'd remove the positioning. I like the idea of having
            the spinner replacing the icon. But in the current state it is
            replaced, but also re-positioned what feels weird.
            I'd also prepend the text with the loading spinner instead of overlaying it.
        -->
        <span
            v-if="loading"
            class="position-absolute top-50 start-50 translate-middle"
        >
            <LoadingSpinner :size="'lg'" />
        </span>
        <slot
            v-else
            name="icon"
        ></slot>

        <span
            class="loading-button-content"
            :class="contentClass"
        >
            <slot></slot>
        </span>
    </button>
</template>

<script
    lang="ts"
    setup
>
    import { computed, ref } from 'vue';
    import LoadingSpinner from '@/components/Indicators/LoadingSpinner/LoadingSpinner.vue';
    import type { ColorName } from 'src/types/Colors';

    const emits = defineEmits<{
        (e: 'error', message: string): void;
    }>();

    const props = defineProps<{
        outlined?: boolean
        color?: ColorName
        loading?: boolean
        action?: Function
    }>();

    const currentlyExecuted = ref(false);

    const contentClass = computed(_ => {
        return {
            'opacity-0': loading.value,
        };
    });

    const buttonClass = computed(_ => {
        const color = props.color ?? 'dark';
        const baseName = props.outlined ? 'btn-outline' : 'btn';
        return `btn ${baseName}-${color}`;
    })

    async function exec() {

        // If the action is managed via click handlers,
        // we ignore the exec function.
        if(!props.action) {
            return;
        }

        if(!loading.value) {
            try {
                currentlyExecuted.value = true;
                await props.action();
                currentlyExecuted.value = false;
            } catch(e) {
                emits('error', e instanceof Error ? e.message : String(e));
            }
        }
    }

    const loading = computed(() => {
        return props.loading || currentlyExecuted.value;
    });

</script>

<style>
    .loading-button-content {
        opacity: 1;
        transition: opacity .3s ease-in-out;
    }
</style>