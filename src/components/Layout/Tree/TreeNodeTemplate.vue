<template>
    <div class="tree-node-slot">
        {{ node.name }}
    </div>
</template>

<script
    setup
    lang="ts"
>
    import { Node } from '@/types/Layout';


    defineProps<{
        node: Node,
    }>();

</script>