<template>
    <div class="d-flex gap-4">
        <IconStat
            v-for="(item, index) in value"
            :key="index"
            :icon="item.icon"
            :data="item.data"
            @click="item.action ? item.action() : null"
        />
    </div>
</template>

<script
    setup
    lang="ts"
>
    import IconStat from '../IconStat/IconStat.vue';
    import { IconDefinition } from '@fortawesome/fontawesome-common-types';

    export interface IconStat {
        icon: IconDefinition;
        data: string | number;
        action?: Function;
    }

    defineProps<{
        value: IconStat[];
    }>();
</script>