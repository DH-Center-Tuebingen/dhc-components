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
            @executed="(item, success) => emit('executed', item, success)"
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

    import { computed, provide, readonly, ref } from 'vue';
    import ListItem from './ListItem.vue';

    const props = defineProps<{
        /** Specifies if icons should be displayed. Items that do not have an icon will be indented to match the items with icon. */
        withIcons?: boolean;
        /** List of items to display in the list. */
        items: ListItemType[];
        /** Disables all items in the list when a single item is executing an action. */
        disableAll?: boolean;
    }>();

    const emit = defineEmits<{
        /**
         * Executed is called after each action was executed, whether it was successful or not.
         */
        (e: 'executed', item: ListItemType, success: boolean): void;
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
                console.log('START ACTION');
                await action();
                console.log('END ACTION');
            }
            finally {
                executionCount.value--;
                console.log('END EXECUTION');
            }
        },
    })

</script>