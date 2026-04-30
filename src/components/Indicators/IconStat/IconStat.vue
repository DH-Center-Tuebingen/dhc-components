<template>
    <div
        :class="[textColor]"
        :role="interactable"
        class="d-flex align-items-center gap-2"
        @click="exec()"
    >
        <FontAwesomeIcon :icon="icon" />
        <span
            v-if="!iconOnly"
            class="fw-bold user-select-none"
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
        return props.action ? 'button' : undefined;
    });

    const textColor = computed(() => {
        const color = props.color ?? 'secondary';
        return `text-${color}`;
    });

    const exec = () => {
        if(props.action) {
            props.action();
        }
    };
</script>