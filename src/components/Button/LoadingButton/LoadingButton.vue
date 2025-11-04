<template>
    <button
        class="position-relative d-flex align-items-center justify-content-center"
        :class="buttonClass"
        role="button"
        :disabled="loading"
        @click="exec()"
    >
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
        action: Function
    }>();

    const currentlyExecuted = ref(false);

    const contentClass = computed(_ => {
        return {
            'opacity-0': props.loading,
        };
    });

    const buttonClass = computed(_ => {
        const color = props.color ?? 'dark';
        const baseName = props.outlined ? 'btn-outline' : 'btn';
        return `btn ${baseName}-${color}`;
    })

    async function exec() {
        if(!props.loading) {
            try {
                currentlyExecuted.value = true;
                await props.action();
            } catch(e) {
                emits('error', e instanceof Error ? e.message : String(e));
            }
        }

        const loading = computed(() => {
            return props.loading || currentlyExecuted.value;
        });
    }

</script>