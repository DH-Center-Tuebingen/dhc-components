<template>
    <div class="column-separator">
        <div class="column-separator-line"></div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
    .column-separator {
        z-index: 1;
        display: flex;
        justify-content: center;
        height: 100%;

        width: 10px;
        cursor: col-resize;
        overflow: hidden;
        background-color: rgba(0, 0, 255, 0);
        transform: translateX(50%);
        transition: background-color .5s;
    }

    .column-separator:hover {
        background-color: rgba(0, 0, 255, 0.1);
    }

    .column-separator:hover .column-separator-line {
        background-color: rgba(0, 0, 255, 1);
    }

    .column-separator-line {
        height: 100%;
        background-color: rgb(88, 88, 88);
        box-sizing: border-box;
        width: 2px;
        
        transition: background-color .5s;
    }
</style>