<template>
    <div class="column-separator z-1">
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
        background-color: rgba(var(--bs-primary-rgb), 0);
        transform: translateX(50%);
        transition: background-color .5s;
    }

    .column-separator:hover {
        background-color: rgba(var(--bs-primary-rgb), 0.3);
    }

    .column-separator:hover .column-separator-line {
        background-color: var(--bs-primary);
    }

    .column-separator-line {
        height: 100%;
        background-color: var(--bs-border-color);
        box-sizing: border-box;
        width: 1px;
        transition: background-color .5s;
        transform: translateX(-50%);
    }
</style>