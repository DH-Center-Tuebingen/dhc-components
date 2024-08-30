<template>
    <div
        class="accordion"
        :class="{ 'accordion-flush': flush }"
        :id="name"
    >
        <slot></slot>
        <AccordionItem
            v-for="(section, index) in items"
            :key="`accordion-item-${index}`"
            :options="section"
            :parent-name="name"
            :onlyOneOpen="onlyOneOpen"
        >
            <slot :name="section.name"></slot>
        </AccordionItem>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import { default as AccordionItem, type AccordionItemOptions} from './AccordionItem.vue';

    const props = withDefaults(defineProps<{
        name: string;
        items: Array<AccordionItemOptions>;
        flush?: boolean;
        onlyOneOpen?: boolean;
    }>(), {
        flush: false,
        onlyOneOpen: false
    });

</script>