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

        <span :class="contentClass">
            <slot></slot>
        </span>
    </button>
</template>

<script
    lang="ts"
    setup
>
    import { computed, ref } from 'vue';
    import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner.vue';
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

    // TODO: [VR]: This hides the whole content if props.loading is true on
    // component mount. This behaviour is different from what happens when
    // computed prop `loading` is true.
    const contentClass = computed(_ => {
        return {
            // 'opacity-0': props.loading,
        };
    });

    const buttonClass = computed(_ => {
        const color = props.color ?? 'dark';
        const baseName = props.outlined ? 'btn-outline' : 'btn';
        return `btn ${baseName}-${color}`;
    })

    async function exec() {
        // TODO: [VR]: Shouldn't this be loading.value to prevent exec if there is already
        // an action running?
        if(!props.loading) {
            try {
                currentlyExecuted.value = true;
                if(props.action) {
                    await props.action();
                } else {
                    // [VR] it either makes no sense to have a loading button without an action
                    // or it should have a default action that does nothing but shows the loading state
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
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