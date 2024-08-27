<template>
    <div
        class="accordion"
        :id="name"
    >
        <AccordionItem
            v-for="(title, index) in titles"
            :key="`accordion-item-${index}`"
            :title="title"
            :parent-name="name"
        >
            <slot :name="title"></slot>
        </AccordionItem>
    </div>
</template>

<script setup lang="ts">
    import AccordionItem from './AccordionItem.vue';

    defineProps<{
        name: string;
        titles: Array<string>;
    }>();


</script>