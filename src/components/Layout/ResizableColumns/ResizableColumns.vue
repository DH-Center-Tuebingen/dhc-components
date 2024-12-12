<template>
    <div
        class="d-flex w-100"
        ref="container"
        @mouseleave="e => endMoveColumn(e)"
        @mouseup="e => endMoveColumn(e)"
        style="height: 100vh;"
    >
        <template
            v-for="(column, columnIndex) of columns"
            :key="column.name"
        >
            <div
                class="column-wrapper"
                :style="columnWrapperStyle(column)"
            >
                <div
                    class="column"
                >
                    <slot :name="column.name" />
                </div>
                <ColumnSeparator
                    v-if="columnIndex !== columns.length - 1"
                    @mousedown.stop.prevent="e => startMoveColumn(e, columnIndex)"
                    @mouseup="e => endMoveColumn(e)"
                    @click.stop.prevent
                />
            </div>

        </template>
    </div>
</template>

<script setup lang="ts">
    import { CSS } from 'src/types/Common';
    import { ColumnDefinition } from 'src/types/Layout';
    import { computed, onUnmounted, ref } from 'vue';
    import ColumnSeparator from './ColumnSeparator.vue';

    const columns = defineModel<ColumnDefinition[]>({
        required: true,
        default: () => []
    })

    const startPosition = ref(0);
    const leftColumnIndex = ref<number | null>(null);
    const rightColumnIndex = ref<number | null>(null);

    const leftStartWidth = ref(0);
    const rightStartWidth = ref(0);

    const leftColumn = computed(() => leftColumnIndex.value !== null ? columns.value[leftColumnIndex.value] : null);
    const rightColumn = computed(() => rightColumnIndex.value !== null ? columns.value[rightColumnIndex.value] : null);

    const container = ref<HTMLDivElement>();
    const totalWidth = computed(() => columns.value.reduce((acc, column) => acc + column.width, 0));

    const calculateWidth = (column: ColumnDefinition): number => {
        if (container.value === undefined) { return 0; }
        return (column.width / totalWidth.value) * 100;
    }

    const calculateWidthCss = (column: ColumnDefinition): string => {
        return calculateWidth(column) + '%'
    }

    const columnWrapperStyle = (column: ColumnDefinition): CSS => {
        return {
            width: calculateWidthCss(column),
            position: 'relative'
        }
    }

    const moveListener = (e: MouseEvent) => {
        let diff = e.clientX - startPosition.value;

        // Prevent resizing if the columns are not set
        if (leftColumnIndex.value == null ||
            rightColumnIndex.value == null ||
            leftColumn.value == null ||
            rightColumn.value == null ||
            container.value == null) { return; }

        // Transform the values from pixels to column width
        const localTotalWidth = totalWidth.value;
        const percent = diff / container.value.clientWidth;
        const columnWidthDiff = localTotalWidth * percent;

        // Apply the new width to the left column
        let newLeftWidth = leftStartWidth.value + columnWidthDiff;
        if (leftColumn.value.minWidth && newLeftWidth < leftColumn.value.minWidth) {
            newLeftWidth = leftColumn.value.minWidth;
        }
        if (leftColumn.value.maxWidth && newLeftWidth > leftColumn.value.maxWidth) {
            newLeftWidth = leftColumn.value.maxWidth;
        }

        // Apply the new width to the right column 
        // & adjust the left column width if the right column has a min/max width
        const combinedWidth = leftColumn.value.width + rightColumn.value.width;
        let newRightWidth = combinedWidth - newLeftWidth;
        if (rightColumn.value.minWidth && newRightWidth < rightColumn.value.minWidth) {
            newRightWidth = rightColumn.value.minWidth;
            newLeftWidth = combinedWidth - newRightWidth;
        }

        if (rightColumn.value.maxWidth && newRightWidth > rightColumn.value.maxWidth) {
            newRightWidth = rightColumn.value.maxWidth;
            newLeftWidth = combinedWidth - newRightWidth;
        }

        // Update the column widths
        columns.value[leftColumnIndex.value].width = newLeftWidth;
        columns.value[rightColumnIndex.value].width = newRightWidth;
    }

    const startMoveColumn = (e: MouseEvent, columnIndex: number) => {
        startPosition.value = e.clientX;
        leftColumnIndex.value = columnIndex;
        rightColumnIndex.value = columnIndex + 1;

        leftStartWidth.value = columns.value[columnIndex].width;
        rightStartWidth.value = columns.value[columnIndex + 1].width;

        window.addEventListener('mousemove', moveListener);
    }

    const endMoveColumn = (e: MouseEvent) => {
        leftColumn.value = null;
        rightColumn.value = null;
        window.removeEventListener('mousemove', moveListener);
    }

    onUnmounted(() => {
        window.removeEventListener('mousemove', moveListener);
    });

</script>

<style scoped>

    .column-separator {
        position: absolute;
        right: 0;
        transform: translateX(50%);
    }

    .column-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
    }

    .column {
        height: 100%;
        max-height: 100%;
        overflow-y: auto;
        padding: 1rem;
    }
</style>