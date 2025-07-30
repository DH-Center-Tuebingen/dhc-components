<template>
    <component
        :is="item.routerLink ? 'router-link' : 'button'"
        href="#"
        class="d-flex list-group-item list-group-item-action align-items-center gap-3"
        type="button"
        :disabled="disabled"
        :to="item.routerLink"
        @click="(event: MouseEvent) => exec(event, item)"
    >
        <template v-if="props.withIcons">

            <LoadingSpinner
                v-if="loading"
                style="width: 16px;"
            />
            <FontAwesomeIcon
                v-else-if="item.icon"
                :icon="item.icon"
                style="width: 16px;"
            />
            <span
                v-else
                class="d-inline-block"
                style="width: 16px;"
            >
                &nbsp;
            </span>
        </template>
        <span class="flex-grow-1">
            {{ item.name }}
        </span>
        <LoadingSpinner v-if="!withIcons && loading" />
    </component>
</template>

<script
    setup
    lang="ts"
>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { ListItem, ListExecutionContext } from '@/types/List'

    import { computed, ref, inject, type ComputedRef, type Ref } from 'vue';
    import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.vue';

    const props = defineProps<{
        item: ListItem;
        withIcons?: boolean;
        disabled?: boolean;
    }>();

    const emit = defineEmits<{
        (e: 'executed', item: ListItem): void;
    }>();

    const executing: Ref<boolean> = ref(false);

    const loading: ComputedRef<boolean> = computed(() => {
        return props.item.loading || executing.value;
    });

    const disabled: ComputedRef<boolean> = computed(() => {
        return props.disabled || props.item.disabled || loading.value;
    });

    const listExecutionContext = inject<ListExecutionContext>('list-execution-context');
    const exec = async (event: MouseEvent, item: ListItem): Promise<void> => {
        if(item.routerLink) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        if(item.action) {
            const action = item.action;
            executing.value = true;
            try {
                if(listExecutionContext?.wrapExecution) {
                    console.log('Wrapping execution');
                    await listExecutionContext.wrapExecution(async () => {
                        await action();
                        emit('executed', item);
                    });
                } else {
                    await action();
                }
            } catch(error) {
                console.error('Error executing action:', error);
            } finally {
                executing.value = false;
            }
        }
    }

</script>