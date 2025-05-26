<template>
    <div class="tree-control d-flex align-items-center">
        <span class="me-2">
            {{ (isLast || (hasChildren && value)) ? "└" : "├" }}
        </span>
        <span
            v-if="hasChildren"
            class="node-toggle me-2 user-select-none"
            style="cursor: pointer;"
            @click="value = !value"
        >
            [{{ value ? '-' : '+' }}]
        </span>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import type { Node } from '@/types/Layout';
    import { computed } from 'vue';
    const value = defineModel<boolean>('modelValue');

    const props = defineProps<{
        index: number;
        total: number;
        node: Node
    }>();

    const isLast = computed(() => props.index === props.total - 1);
    const hasChildren = computed(() => props.node.children && props.node.children.length > 0);

</script>