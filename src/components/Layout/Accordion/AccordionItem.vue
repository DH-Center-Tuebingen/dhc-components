<template>
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#${identifier}`"
                aria-expanded="false"
                :aria-controls="`${identifier}`"
                :disabled="options.disabled"
            >
                {{ title }}
            </button>
        </h2>
        <div
            :id="`${identifier}`"
            class="accordion-collapse collapse"
            :data-bs-parent="bsParent"
        >
            <div class="accordion-body">
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
        title?: string;
        name: string;
        disabled?: boolean;
    }

    const props = defineProps<{
        onlyOneOpen?: boolean;
        parentName: string;
        options: AccordionItemOptions;
    }>();

    const title = computed(_ => props.options.title ?? props.options.name);
    const identifier = computed(_ => `${props.parentName.toLowerCase()}-${props.options.name.toLowerCase()}`);

    // We recommend not using the onlyOneOpen prop, as Bootstrap has a Bug, when clicked quickly 
    // on multiple accordion items, the accordion will not close properly and multiple items will be opened anyways.
    // See: https://github.com/twbs/bootstrap/issues/35685
    const bsParent = computed(_ => props.onlyOneOpen ? `#${props.parentName}` : null);
</script>