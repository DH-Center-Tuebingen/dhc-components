<template>
    <Container class="d-flex flex-column gap-1 h-100 overflow-y-auto">
        <List
            v-for="section in menu"
            :key="section.name"
            :items="section.items"
        >
            {{ section.name }}
        </List>
    </Container>
</template>

<script setup lang="ts">
    import Container from '../Container/Container.vue';
    import List, { ListItem } from '../List/List.vue';

    type MenuSection = {
        name: string;
        items: ListItem[];
    }

    defineProps<{
        menu: MenuSection[];
    }>();

</script>