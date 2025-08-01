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
            :open="open"
        >
            <slot :name="section.name"></slot>
        </AccordionItem>
    </div>
</template>

<script
    setup
    lang="ts"
>
    import { default as AccordionItem, type AccordionItemOptions } from './AccordionItem.vue';

    withDefaults(defineProps<{
        /**
         * The name of the accordion, used for aria attributes and identification.
         */
        name: string;
        /**
         * The items to display in the accordion.
         */
        items: Array<AccordionItemOptions>;
        /**
         * When set the accordion will not have a border.
         */
        flush?: boolean;
        /**
         * Whether the accordion should only allow one item to be open at a time
         */
        onlyOneOpen?: boolean;
        /**
         * Whether the accordion should be opened by default
         */
        open?: boolean;
    }>(), {
        flush: false,
        onlyOneOpen: false,
        open: false
    });

</script>