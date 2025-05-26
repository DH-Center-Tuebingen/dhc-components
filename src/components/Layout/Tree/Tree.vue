<template>
    <TreeNode
        v-for="(node, index) in nodes"
        :key="node.id"
        :node="node"
        :index="index"
        :total="nodes.length"
        :node-component="nodeComponent"
        :control-component="controlComponent"
    />
</template>

<script
    setup
    lang="ts"
>
    import { ComponentLike, Node } from '@/types/Layout';
    import TreeNode from './TreeNode.vue';


    const props = defineProps<{
        nodes: Node[];
        nodeComponent?: ComponentLike;
        controlComponent?: ComponentLike;
    }>();
</script>

<style>
    .tree-node {
        display: block;
    }

    .node-children {
        margin-left: 20px;
    }

    .node-content {
        display: flex;
        align-items: center;
    }
</style>