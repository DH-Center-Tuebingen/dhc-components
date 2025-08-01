<template>
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button
                :class="['accordion-button', { 'collapsed': !isOpen }]"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#${identifier}`"
                :aria-expanded="isOpen ? 'true' : 'false'"
                :aria-controls="`${identifier}`"
                :disabled="options.disabled"
            >
                {{ title }}
            </button>
        </h2>
        <div
            :id="`${identifier}`"
            :class="['accordion-collapse', 'collapse', { 'show': isOpen }]"
            :data-bs-parent="bsParent"
        >
            <div class="accordion-body" :class="{ 'p-0': options.flush }">
                <slot></slot>
            </div>
        </div>
    </div>

</template>

<script
    setup
    lang="ts"
>
    import { computed } from 'vue';

    export type AccordionItemOptions = {
        /**
         * The title of the accordion item, displayed in the header.
         */
        title?: string;
        /**
         * The name of the accordion item, used for aria attributes and identification.
         */
        name: string;
        /**
         * Whether the accordion item should be disabled.
         */
        disabled?: boolean;
        /**
         * Whether the accordion item should be open by default.
         */
        open?: boolean;
        /**
         * Removes the padding when the content already has padding.
         */
        flush?: boolean;
    }

    const props = defineProps<{
        onlyOneOpen?: boolean;
        parentName: string;
        options: AccordionItemOptions;
        open?: boolean;
    }>();

    const title = computed(_ => props.options.title ?? props.options.name);
    const identifier = computed(_ => `${props.parentName.toLowerCase()}-${props.options.name.toLowerCase()}`);
    const isOpen = computed(_ => props.open ?? props.options.open ?? false);

    // We recommend not using the onlyOneOpen prop, as Bootstrap has a Bug, when clicked quickly 
    // on multiple accordion items, the accordion will not close properly and multiple items will be opened anyways.
    // See: https://github.com/twbs/bootstrap/issues/35685
    const bsParent = computed(_ => props.onlyOneOpen ? `#${props.parentName}` : null);
</script>