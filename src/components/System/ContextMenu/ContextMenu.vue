<template>
    <div
        ref="contextMenuRef"
        class="context-menu"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
    import {
        onBeforeUnmount,
        onMounted,
    } from 'vue';

    import { ref } from 'vue';


    const props = defineProps<{
        component: string
    }>();

    const active = ref(false);
    const contextMenuRef = ref(null);

    const handleClickOutside = (e) => {
        if(contextMenuRef.value && !contextMenuRef.value.contains(e.target)) {
            active.value = false;
        }
    };

    onMounted(() => {
        document.body.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
        document.body.removeEventListener('click', handleClickOutside);
    });

</script>

<style lang='scss' scoped>
    .red {
        background-color: red;
        width: 100px;
        height: 100px;
    }
</style>