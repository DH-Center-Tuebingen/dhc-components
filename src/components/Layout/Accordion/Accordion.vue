<template>
    <div
        class="accordion"
        :id="name"
    >
        <AccordionItem
            v-for="(section, index) in sections"
            :key="`accordion-item-${index}`"
            :title="getTitle(index)"
            :section="section"
            :parent-name="name"
        >
            <slot :name="section"></slot>
        </AccordionItem>
    </div>
</template>

<script setup lang="ts">
    import AccordionItem from './AccordionItem.vue';

    const props = withDefaults(defineProps<{
        name: string;
        sections: Array<string>;
        titles?: Array<string> | null;
    }>(), {
        titles: null,
    });
    
    console.log(props.titles);

    const getTitle = (index: number): string => {
        return props.titles ? props.titles[index] : props.sections[index];
    }


</script>