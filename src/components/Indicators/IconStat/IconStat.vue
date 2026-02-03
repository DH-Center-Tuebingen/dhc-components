<template>
    <div
        :class="[textColor, interactable]"
        class="d-flex align-items-center"
        @click="exec()"
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
    import type { TextColor } from '@/types/Colors';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';


    const props = defineProps<{
        icon: IconDefinition;
        text?: string | number;
        iconOnly?: boolean;
        color?: TextColor;
        action?: Function;
    }>();

    const interactable = computed(() => {
        return props.action ? 'cursor-pointer' : '';
    });

    const textColor = computed(() => {
        const color = props.color ?? 'secondary';
        return `text-${color}`;
    });
    
    const exec = () => {
        if (props.action) {
            props.action();
        }
    };
</script>