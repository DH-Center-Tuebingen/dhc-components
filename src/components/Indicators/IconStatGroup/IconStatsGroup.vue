<template>
    <div class="d-flex gap-4">
        <IconStatComponent
            v-for="(item, index) in value"
            :key="index"
            :icon="item.icon"
            :icon-only="item.iconOnly"
            :text="item.text"
            :title="item.title"
            :color="item.color"
            @click="item.action ? item.action() : null"
        />
    </div>
</template>

<script
    setup
    lang="ts"
>
    import type { TextColor } from '@/types/Colors';
    import type { IconDefinition } from '@fortawesome/fontawesome-common-types';

    import IconStatComponent from '../IconStat/IconStat.vue';

    export interface IconStat {
        action?: Function;
        color?: TextColor;
        text: string | number;
        icon: IconDefinition;
        iconOnly?: boolean;
        title?: string;
    }

    defineProps<{
        value: IconStat[];
    }>();
</script>