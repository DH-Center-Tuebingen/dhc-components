<template>
    <div
        class="d-flex w-100"
        ref="container"
        @mouseleave="e => endMoveColumn(e)"
        @mouseup="e => endMoveColumn(e)"
        style="height: 100px;"
    >
        <template
            v-for="(column, columnIndex) of columns"
            :key="column.name"
        >
            <div
                class="column overflow-x-hidden"
                :style="columnStyle(column)"
            >
                {{ column.width }}
                <div
                    v-if="columnIndex !== columns.length - 1"
                    class="position-absolute h-100 top-0 end-0 d-flex justify-content-center"
                    @mousedown.stop.prevent="e => startMoveColumn(e, columnIndex)"
                    @mouseup="e => endMoveColumn(e)"
                    @click.stop.prevent
                    style="width: 10px; cursor: col-resize; overflow: hidden; background-color: red; transform: translateX(50%);"
                >
                    <div
                        class="border-start border-primary border-3 h-100"
                        style="width: 0;"
                    ></div>
                </div>
            </div>

        </template>
    </div>
</template>

<script setup lang="ts">
    import { CSS } from 'src/types/Common';
    import { ColumnDefinition } from 'src/types/Layout';
    import { computed, onUnmounted, ref } from 'vue';

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

    const columnStyle = (column: ColumnDefinition): CSS => {
        return {
            width: calculateWidthCss(column),
            position: 'relative'
        }
    }

    const moveListener = (e: MouseEvent) => {
        let diff = e.clientX - startPosition.value;

        if (leftColumnIndex.value == null ||
            rightColumnIndex.value == null ||
            leftColumn.value == null ||
            rightColumn.value == null ||
            container.value == null) { return; }

        const widthPerPoint = container.value.clientWidth/ totalWidth.value;
        // let newLeftWidth = leftColumn.value.width + diff * widthPerPoint;
        // newLeftWidth = Math.max(0,Math.min(newLeftWidth, totalWidth.value));
        // const newRightWidth = totalWidth.value - newLeftWidth;
        
        const percent = diff / container.value.clientWidth;
        const columnWidthDiff = totalWidth.value * percent;
        console.log(diff, columnWidthDiff)
        
        const newLeftWidth = leftStartWidth.value + columnWidthDiff;
        const newRightWidth = rightStartWidth.value - columnWidthDiff;
        
        // console.log(totalWidth.value, newLeftWidth, newRightWidth)
        
        
        columns.value[leftColumnIndex.value].width = newLeftWidth;
        columns.value[rightColumnIndex.value].width = newRightWidth;
    }

    const startMoveColumn = (e: MouseEvent, columnIndex: number) => {
        console.log('START MOVE')
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