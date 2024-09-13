<template>
    <table
        v-show="csvSettings.showPreview"
        class="table table-bordered table-striped table-hover "
        :class="{ 'table-sm': small }"
    >
        <thead
            class="table-light sticky-top"
            style="z-index: 1;"
        >
            <tr>
                <th
                    v-if="csvSettings.showLineNumbers"
                    :class="cellClass"
                >
                    #
                </th>
                <th
                    v-for="(header, i) in header"
                    :key="i"
                    :class="cellClass"
                >
                    {{ capitalize(header) }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(row, i) in rows"
                :key="`csv-preview-row-${i}`"
            >
                <td
                    v-if="csvSettings.showLineNumbers"
                    :class="cellClass"
                >
                    <span class="fw-bold">
                        {{ i + 1 + csvSettings.skippedRows }}
                    </span>
                </td>
                <td
                    v-for="(column, j) in row"
                    :key="`csv-preview-col-${i}-${j}`"
                    :class="[...cellClass!, wrapClassMap[`${i}_${j}`]]"
                    :title="column"
                    @click="toggleWrapping(i, j)"
                >
                    {{ column }}
                </td>
            </tr>
        </tbody>
        <caption
            v-if="endVisible"
            class="bg-dark text-light text-center"
        >
            <div
                class="end-of-file"
                style=""
            >
                {{ t("main.csv.uploader.eof") }}
            </div>
        </caption>
    </table>
</template>

<script
    lang='ts'
    setup
>
    import type { CsvSettings } from '@/types/Csv';
    import type { Map } from '@/types/Map';
    import type { ArrayClass, Class } from '@/types/Vue';

    import { capitalize } from '@/utils/string.ts';
    import { computed, reactive, useAttrs } from 'vue';


    const props = defineProps<{
        header: Array<string>;
        rows: Array<Array<string>>;
        small: Boolean;
        content: String;
        csvSettings: CsvSettings;
    }>();

    const wrapClassMap = reactive<Map<string>>({});

    const toggleWrapping = (row: number, col: number) => {
        // do not toggle if user selects (part of) the content
        if (window?.getSelection()?.toString()) {
            return;
        }
        if (!wrapClassMap[`${row}_${col}`]) {
            wrapClassMap[`${row}_${col}`] = 'text-wrap';
        } else {
            wrapClassMap[`${row}_${col}`] = '';
        }
    };

    const rowCount = computed<number>(_ => {
        return props.rows.length ?? 0;
    });
    const stripedStart = computed<number>(_ => props.csvSettings.skippedRows || 0);

    const endVisible = computed<boolean>(_ => {
        return (stripedStart.value + props.csvSettings.rowsPerPage) > rowCount.value;
    })

    const attrs = useAttrs();
    const cellClass = computed<ArrayClass>(_ => {
        if (!attrs.class) {
            return ['px-2 py-1'];
        }

        let arrayClass: ArrayClass;
        if (typeof attrs.class === 'string') {
            arrayClass = attrs.class.split(' ');
        } else {
            arrayClass = attrs.class as ArrayClass;
        }
        return arrayClass;
    });
    
    const 
</script>