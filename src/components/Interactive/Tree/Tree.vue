<template>
    <div
        class="tree"
        ref="treeRef"
    >
        <Node
            v-for="(node, index) in data"
            :key="index"
            :data="node"
        />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import Node, { TreeNode } from './Node.vue';
    
    const treeRef = ref<HTMLElement | null>(null);

    const props = defineProps<{
        data: Array<TreeNode>
    }>();

</script>

<style>
    .tree {
        background-color: rgb(216, 216, 216);
        padding: 1rem;
        border-radius: 1rem;
    }
</style>