<template>
    <div class="d-flex flex-column">
        <header
            class="d-flex gap-3 align-items-center overflow-visible"
            :class="csvSettings.showPreview ? 'mb-3' : ''"
        >
            <CsvSettings
                v-model:delimiter="csvSettings.delimiter"
                v-model:has-header-row="csvSettings.hasHeaderRow"
                v-model:show-line-numbers="csvSettings.showLinenumbers"
                v-model:show-count="csvSettings.showCount"
                v-model:skipped-count="csvSettings.skippedCount"
                v-model:useCustomDelimiter="csvSettings.useCustomDelimiter"
                v-model:show-preview="csvSettings.showPreview"
                class="d-flex"
                :total="state.rows"
                :show-preview-button="enablePreviewToggle"
            >
                <template
                    #after
                    v-if="$slots['toolbar-after']"
                >
                    <slot name="toolbar-after" />
                </template>
            </CsvSettings>
        </header>
        <div class="table-responsive position-relative overflow-y-auto overflow-x-auto">
            <table
                v-show="csvSettings.showPreview"
                class="table table-bordered table-striped table-hover"
                :class="{ 'table-sm': small }"
            >
                <!--     
            Bootstrap sets the sticky-top to z-index: 1020, which is the same level
            as the modals, which doesn't make sense in the table context.
            We reset it to the minimum value here.  
            -->
                <thead
                    class="table-light sticky-top"
                    style="{z-index: 1}"
                >
                    <tr>
                        <th
                            v-if="csvSettings.showLinenumbers"
                            :class="cellClass"
                        >
                            #
                        </th>
                        <th
                            v-for="(header, i) in state.computedRows.header"
                            :key="i"
                            :class="cellClass"
                        >
                            {{ StringUtils.capitalize(header) }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="csvSettings.skippedCount > 0">
                        <td
                            class="text-center border-1 border-primary p-1 text-primary"
                            colspan="100%"
                        >
                            <FontAwesomeIcon
                                :icon="faCircleUp"
                                :fixed-width="true"
                            />
                            {{ t("main.csv.uploader.skipped_rows", { count: csvSettings.skippedCount }) }}
                        </td>
                    </tr>

                    <tr
                        v-for="(row, i) in state.computedRows.striped_data"
                        :key="`csv-preview-row-${i}`"
                    >
                        <td
                            v-if="csvSettings.showLinenumbers"
                            :class="cellClass"
                        >
                            <span class="fw-bold">
                                {{ i + 1 + csvSettings.skippedCount }}
                            </span>
                        </td>
                        <td
                            v-for="(column, j) in row"
                            :key="`csv-preview-col-${i}-${j}`"
                            :class="[...cellClass, state.wrapClass[`${i}_${j}`]]"
                            :title="column"
                            @click="toggleWrapping(i, j)"
                        >
                            {{ column }}
                        </td>
                    </tr>
                    <tr v-if="!state.endVisible">
                        <td
                            class="text-center border-1 border-primary p-1 text-primary"
                            colspan="100%"
                        >
                            <FontAwesomeIcon
                                :icon="faCircleDown"
                                :fixed-width="true"
                            />
                            {{ t("main.csv.uploader.skipped_rows", { count: csvSettings.skippedCount }) }}
                        </td>
                    </tr>
                </tbody>
                <caption
                    v-if="state.endVisible"
                    class="border border-warning text-warning text-center rounded-bottom"
                >
                    <div
                        class="end-of-file"
                        style=""
                    >
                        <FontAwesomeIcon :icon="faTriangleExclamation" />
                        {{ t("main.csv.uploader.eof") }}
                    </div>
                </caption>
            </table>
        </div>
    </div>
</template>

<script
    lang="ts"
    setup
>
    import * as d3 from 'd3-dsv';

    import {
        computed,
        onMounted,
        reactive,
        watch,
    } from 'vue';

    import { useI18n } from 'vue-i18n';

    import CsvSettings from './CsvSettings.vue';
    import { StringUtils } from 'dhc-utils';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCircleDown, faCircleUp, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

    const { t } = useI18n();

    const props = withDefaults(defineProps<{
        content: string;
        small: boolean;
        linenumbers: boolean;
        enablePreviewToggle?: boolean;
    }>(), {
        enablePreviewToggle: false,
    });

    const emit = defineEmits<{
        (e: 'parse', data: any): void;
    }>();

    // FUNCTIONS
    const toggleWrapping = (row: number, col: number) => {
        // do not toggle if user selects (part of) the content
        if(window.getSelection()?.toString()) {
            return;
        }
        if(!state.wrapClass[`${row}_${col}`]) {
            state.wrapClass[`${row}_${col}`] = 'text-wrap';
        } else {
            state.wrapClass[`${row}_${col}`] = '';
        }
    };
    const recomputeRows = (internal = false) => {
        if(!props.content || !state.dsv) {
            state.computedRows = {};
            return;
        }
        const res: {
            header: string[] | null;
            data: any[] | null;
            striped_data: any[] | null;
        } = {
            header: null,
            data: null,
            striped_data: null,
            ...csvSettings,
        };
        const headerRow = props.content.split('\n')[0];
        const header = state.dsv.parseRows(headerRow)[0];
        if(csvSettings.hasHeaderRow) {
            res.header = header;
            res.data = state.dsv.parse(props.content);
        }
        else {
            const headerPlaceholder = [];
            for(let i = 0; i < header.length; i++) {
                headerPlaceholder.push(`#${i + 1}`);
            }
            res.data = state.dsv.parseRows(props.content);
            res.header = headerPlaceholder;
        }
        state.computedRows = res;
        if(res.data === null || res.data.length === 0) {
            state.computedRows.striped_data = [];
        } else {
            state.computedRows.striped_data = res.data.slice(state.stripedStart, state.stripedEnd);
        }
        
        if(!internal) {
            emit('parse', state.computedRows);
        }
    };

    const csvSettings = reactive({
        delimiter: ',',
        hasHeaderRow: true,
        showLinenumbers: false,
        showCount: 10,
        skippedCount: 0,
        showPreview: true,
        useCustomDelimiter: false,
    })

    // DATA
    const state: any = reactive({
        computedRows: {},
        wrapClass: {},
        dsv: computed(() => d3.dsvFormat(csvSettings.delimiter || ',')),
        endVisible: computed(() => state.stripedStart + csvSettings.showCount > state.rows),
        rows: computed(() => state.computedRows.data ? state.computedRows.data.length : 0),
        maxRows: computed(() => state.rows - csvSettings.skippedCount),
        maxSkippedRows: computed(() => state.rows > 0 ? state.rows - 1 : 0),
        stripedStart: computed(() => csvSettings.skippedCount || 0),
        stripedEnd: computed(() => Math.min((csvSettings.skippedCount || 0) + (csvSettings.showCount || 10), state.rows)),
    });



    onMounted(() => {
        recomputeRows();
    });

    watch(() => props.content, () => {
        recomputeRows();
    });

    watch(() => csvSettings.hasHeaderRow, (newVal, oldVal) => {
        if(oldVal !== newVal) {
            recomputeRows();
        }
    });
    watch(() => csvSettings.showCount, (newVal, oldVal) => {
        if(oldVal !== newVal) {
            recomputeRows(true);
        }
    });
    watch(() => csvSettings.skippedCount, (newVal, oldVal) => {
        if(oldVal !== newVal) {
            recomputeRows(true);
        }
    });

    watch(() => csvSettings.delimiter, (newVal, oldVal) => {
        if(oldVal !== newVal) {
            recomputeRows();
        }
    });

    const cellClass = 'px-2 py-1';

</script>