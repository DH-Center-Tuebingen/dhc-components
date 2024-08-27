<template>
    <ul class="dropdown-menu">
        <li
            v-for="item in items"
            :key="item"
            class="dropdown-item"
        >{{ item }}</li>
    </ul>
</template>

<script setup lang="ts">


    defineProps<{
        items: string[]
    }>();



</script>