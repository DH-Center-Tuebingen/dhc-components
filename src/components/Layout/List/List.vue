<template>
    <div class="list-group user-select-none">
        <header
            class="list-group-item disabled py-1 .text-black-50 fw-bold"
            v-if="$slots.default"
        >
            <slot></slot>
        </header>
        <ListItem
            v-for="(item, index) in props.items"
            :key="index"
            :item="item"
            :index="index"
            :with-icons="props.withIcons"
            :disabled="forceDisableAll"
        />
    </div>
</template>

<script
    setup
    lang="ts"
>
    import type { 
        ListItem as ListItemType, 
        ListExecutionContext, 
    } from '@/types/List';

    import { computed, provide, ref } from 'vue';
    import ListItem from './ListItem.vue';
    import { readonly } from 'vue';


    const props = defineProps<{
        withIcons?: boolean;
        items: ListItemType[];
        disableAll?: boolean;
    }>();

    const forceDisableAll = computed(() => {
        return props.disableAll && executionCount.value > 0;
    });

    /**
     * Execution context for the list items.
     * 
     * This context is used to manage the execution state of the child items.
     * We keep track of the number of executions to determine if the list is currently executing.
     * This allows us to disable all items when an action is being executed.
     * NOTE: In theory the executionCount should never be greater than one, but
     *       this seems to be the simplest and most reobust way to handle this.
     */
    const executionCount = ref(0);
    provide<ListExecutionContext>('list-execution-context', {
        executing: computed(() => executionCount.value > 0),
        executionCount: readonly(executionCount),
        startExecution: () => {
            executionCount.value++;
        },
        endExecution: () => {
            executionCount.value--;
        },
        wrapExecution: async (action: () => Promise<void>) => {
            executionCount.value++;
            try {
                await action();
            }
            finally {
                executionCount.value--;
            }
        },
    })

</script>