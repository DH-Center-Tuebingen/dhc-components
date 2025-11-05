<template>
    <div class="d-flex gap-4">
        <IconStatComponent
            v-for="(item, index) in value"
            :key="index"
            :icon="item.icon"
            :icon-only="item.iconOnly"
            :data="item.data"
            @click="item.action ? item.action() : null"
        />
    </div>
</template>

<script
    setup
    lang="ts"
>
    import IconStatComponent from '../IconStat/IconStat.vue';
    import { IconDefinition } from '@fortawesome/fontawesome-common-types';

    export interface IconStat {
        icon: IconDefinition;
        iconOnly?: boolean;
        data: string | number;
        action?: Function;
    }

    defineProps<{
        value: IconStat[];
    }>();
</script>