<template>
    <nav>
        <div
            v-if="!hideMetadata && !missingMetadata"
            class="d-flex justify-content-between align-items-center small text-secondary"
        >

            <span>Shown: {{ data?.to }} of {{ data?.total }} items</span>
            <span>Page {{ data?.current_page }} / {{ data?.last_page }}</span>
        </div>
        <ul
            v-if="!hideNavigation"
            class="pagination justify-content-center"
            :class="sizeClass"
        >
            <li class="page-item">
                <a
                    class="page-link"
                    :class="{ disabled: isFirstPageOrNotSet }"
                    :disabled="isFirstPageOrNotSet"
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
                    :class="{ disabled: isFirstPageOrNotSet }"
                    :disabled="isFirstPageOrNotSet"
                    href="#"
                    @click.prevent="gotoPrevPage()"
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
                :class="{ active: page === data?.current_page }"
            >
                <a
                    class="page-link"
                    href="#"
                    :disabled="page === data?.current_page"
                    @click.prevent="gotoPage(page)"
                >
                    {{ page }}
                </a>
            </li>
            <li class="page-item">
                <a
                    class="page-link"
                    :class="{ disabled: data?.current_page === data?.last_page }"
                    :disabled="data?.current_page === data?.last_page"
                    href="#"
                    @click.prevent="gotoNextPage()"
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
                    :class="{ disabled: data?.current_page === data?.last_page }"
                    :disabled="data?.current_page === data?.last_page"
                    href="#"
                    @click.prevent="gotoPage(data?.last_page)"
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

    import { PaginationProps, PaginationObject } from './definitions';

    const props = withDefaults(defineProps<PaginationProps>(), {
        displayCount: 2,
        hideCurrentPage: false,
        hideNavigation: false,
        pageParam: 'page',
        hideMetadata: false,
    });

    const missingMetadata = computed(() => {
        if(!props.data) return true;
        if(!props.data.current_page) return true;
        if(!props.data.last_page) return true;
        if(!props.data.to) return true;
        if(!props.data.total) return true;

        return false;
    });

    const isFirstPageOrNotSet = computed(() => {
        if(!props.data) {
            return [];
        }

        return !props.data.current_page || props.data.current_page === 1;
    });

    const displayPages = computed(() => {
        if(!props.data) {
            return [];
        }

        let start = Math.max(1, props.data.current_page - props.displayCount);
        let end = Math.min(props.data.last_page, props.data.current_page + props.displayCount);

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });

    const sizeClass = computed(() => {
        if(!props.size) return;

        return `pagination-${props.size}`;
    });

    const gotoPage = (page?: number) => {
        if(!page) return;

        emits('goto', page);
    };

    const gotoPrevPage = () => {
        if(!props.data) return;

        gotoPage(props.data.current_page - 1);
    };

    const gotoNextPage = () => {
        if(!props.data) return;

        gotoPage(props.data.current_page + 1);
    };

    const emits = defineEmits<{
        (e: 'goto', page: number): void;
    }>();

</script>

<style lang="scss">
</style>