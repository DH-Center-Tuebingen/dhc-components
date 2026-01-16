<template>
    <nav aria-label="Page navigation example">
        <div
            v-if="!hideMetadata"
            class="d-flex justify-content-between align-items-center small text-secondary"
        >

            <span>Shown: {{ data.to }} of {{ data.total }} items</span>
            <span>Page {{ data.current_page }} / {{ data.last_page }}</span>
        </div>
        <ul class="pagination justify-content-center">
            <li class="page-item">
                <a
                    class="page-link"
                    :class="{ disabled: props.data.current_page === 1 }"
                    :disabled="props.data.current_page === 1"
                    href="#"
                    @click.prevent="gotoPage(1)"
                >
                    <FontAwesomeIcon
                        :icon="faAngleDoubleLeft"
                        size="xs"
                    />
                </a>
            </li>
            <li class="page-item">
                <a
                    class="page-link"
                    :class="{ disabled: props.data.current_page === 1 }"
                    :disabled="props.data.current_page === 1"
                    href="#"
                    @click.prevent="gotoPage(props.data.current_page - 1)"
                >
                    <FontAwesomeIcon
                        :icon="faAngleLeft"
                        size="xs"
                    />
                </a>
            </li>
            <li
                v-for="page in displayPages"
                :key="page"
                class="page-item"
                :class="{ active: page === props.data.current_page }"
            >
                <a
                    class="page-link"
                    href="#"
                    :disabled="page === props.data.current_page"
                    @click.prevent="gotoPage(page)"
                >
                    {{ page }}
                </a>
            </li>
            <li class="page-item">
                <a
                    class="page-link"
                    :class="{ disabled: props.data.current_page === props.data.last_page }"
                    :disabled="props.data.current_page === props.data.last_page"
                    href="#"
                    @click.prevent="gotoPage(props.data.current_page + 1)"
                >
                    <FontAwesomeIcon
                        :icon="faAngleRight"
                        size="xs"
                    />
                </a>
            </li>
            <li class="page-item">
                <a
                    class="page-link"
                    :class="{ disabled: props.data.current_page === props.data.last_page }"
                    :disabled="props.data.current_page === props.data.last_page"
                    href="#"
                    @click.prevent="gotoPage(props.data.last_page)"
                >
                    <FontAwesomeIcon
                        :icon="faAngleDoubleRight"
                        size="xs"
                    />
                </a>
            </li>
        </ul>
    </nav>
</template>

<script
    setup
    lang="ts"
>
    import { computed } from 'vue';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

    import { PaginationProps } from './definitions';

    const props = withDefaults(defineProps<PaginationProps>(), {
        displayCount: 2,
        hideCurrentPage: false,
        hideNavigation: false,
        pageParam: 'page',
        hideMetadata: false,
    });

    const displayPages = computed(() => {
        let start = Math.max(1, props.data.current_page - props.displayCount);
        let end = Math.min(props.data.last_page, props.data.current_page + props.displayCount);

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });

    const gotoPage = (page: number) => {
        emits('goto', page);
    };

    const emits = defineEmits<{
        (e: 'goto', page: number): void;
    }>();

</script>

<style lang="scss">
</style>