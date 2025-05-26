<template>
    <div class="node-content">
        <component
            v-if="controlComponent"
            :is="controlComponent"
            :index="index"
            :total="total"
            :node="node"
            v-model="open"
        />
        <TreeControl
            v-else
            :index="index"
            :total="total"
            :node="node"
            v-model="open"
        />

        <component
            v-if="nodeComponent"
            :is="nodeComponent"
            :node="node"
        >
        </component>
        <div
            v-else
            class="node-default-slot"
        >
            {{ node.name }}
        </div>
    </div>

    <div
        v-if="open && node.children && node.children.length > 0"
        class="node-children"
    >
        <Tree
            :nodes="node.children"
            :node-component="nodeComponent"
            :control-component="controlComponent"
        />
    </div>
</template>

<script
    setup
    lang="ts"
>
    import { ComponentLike, Node } from 'src/types/Layout';
    import { ref } from 'vue';
    import Tree from './Tree.vue';
    import TreeControl from './TreeControl.vue';

    const props = defineProps<{
        node: Node;
        index: number;
        total: number;
        nodeComponent?: ComponentLike;
        controlComponent?: ComponentLike;
    }>();

    const open = ref(false);
</script>