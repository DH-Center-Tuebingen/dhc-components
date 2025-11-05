<template>
    <div
        :class="textColor"
        class="d-flex align-items-center"
    >
        <FontAwesomeIcon :icon="icon" />
        <span
            v-if="!iconOnly"
            class="ms-2 fw-bold user-select-none"
        >{{ text ?? "-" }}</span>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import { computed } from 'vue';
    import type { ColorName } from '@/types/Colors';
    
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';


    const props = defineProps<{
        icon: IconDefinition;
        text?: string | number;
        iconOnly?: boolean;
        color?: ColorName;
    }>();

    const textColor = computed(() => {
        const color = props.color ?? 'secondary';
        return `text-${color}`;
    });
</script>