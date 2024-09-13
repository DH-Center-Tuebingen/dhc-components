<template>
    <div class="d-flex flex-column">
        <header
            class="d-flex gap-3 align-items-center overflow-visible"
            :class="csvSettings.showPreview ? 'mb-3' : ''"
        >
            <CsvSettings
                v-model:delimiter="csvSettings.delimiter"
                v-model:has-header-row="csvSettings.hasHeaderRow"
                v-model:show-linenumbers="csvSettings.showLinenumbers"
                v-model:show-count="csvSettings.showCount"
                v-model:skipped-count="csvSettings.skippedCount"
                v-model:useCustomDelimiter="csvSettings.useCustomDelimiter"
                v-model:show-preview="csvSettings.showPreview"
                class="d-flex"
                :total="state.rows"
                :removable="removable"
                @remove="$emit('remove')"
            />
        </header>
        <div class="table-responsive position-relative overflow-y-auto overflow-x-auto">
            <CsvView
                v-show="csvSettings.showPreview"
                :rows="state.computedRows.data"
                :content="content"
                :small="small"
                :settings="csvSettings"
                :removable="removable"
                @parse="computedRows = $event"
            />
        </div>
    </div>
</template>

<script>
    import * as d3 from 'd3-dsv';

    import {
        computed,
        onMounted,
        reactive,
        watch,
    } from 'vue';

    import { useI18n } from 'vue-i18n';

    import {
        capitalize,
    } from '@/utils/string.js';
    import CsvSettings from './tools/csv/CsvSettings.vue';
    import { useLocalStorage } from '@/composables/local-storage';

    export default {
        components: { CsvSettings },
        props: {
            content: {
                required: true,
                type: String
            },
            small: {
                required: false,
                type: Boolean
            },
            linenumbers: {
                type: Boolean,
                required: false,
                default: false,
            },
            removable: {
                type: Boolean,
            }
        },
        emits: [
            'parse',
            'remove'
        ],
        setup(props, context) {
            const { t } = useI18n();
            // FETCH
            // FUNCTIONS

            const toggleShowPreview = _ => {
                csvSettings.showPreview = !csvSettings.showPreview;
            };
            const recomputeRows = (internal = false) => {
                if(!props.content || !state.dsv) {
                    state.computedRows = {};
                    return;
                }
                const res = {
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
                state.computedRows.striped_data = res.data.slice(state.stripedStart, state.stripedEnd);
                if(!internal) {
                    context.emit('parse', state.computedRows);
                }
            };


            const { value: csvSettings } = useLocalStorage('csv-settings', {
                delimiter: ',',
                hasHeaderRow: true,
                showLinenumbers: false,
                showCount: 10,
                skippedCount: 0,
                showPreview: true,
                useCustomDelimiter: false,
            });

            // DATA
            const state = reactive({
                computedRows: {},
                wrapClass: {},
                dsv: computed(_ => d3.dsvFormat(csvSettings.delimiter || ',')),

                rows: computed(_ => state.computedRows.data ? state.computedRows.data.length : 0),
                maxRows: computed(_ => state.rows - csvSettings.skippedCount),
                maxSkippedRows: computed(_ => state.rows > 0 ? state.rows - 1 : 0),
                stripedStart: computed(_ => csvSettings.skippedCount || 0),
                stripedEnd: computed(_ => {
                    return Math.min((csvSettings.skippedCount || 0) + (csvSettings.showCount || 10),
                        state.rows);
                }),
            });

            onMounted(_ => {
                recomputeRows();
            });

            watch(_ => props.content, _ => {
                recomputeRows();
            });

            watch(_ => csvSettings.hasHeaderRow, (newVal, oldVal) => {
                if(oldVal !== newVal) {
                    recomputeRows();
                }
            });
            watch(_ => csvSettings.showCount, (newVal, oldVal) => {
                if(oldVal !== newVal) {
                    recomputeRows(true);
                }
            });
            watch(_ => csvSettings.skippedCount, (newVal, oldVal) => {
                if(oldVal !== newVal) {
                    recomputeRows(true);
                }
            });

            watch(_ => csvSettings.delimiter, (newVal, oldVal) => {
                if(oldVal !== newVal) {
                    recomputeRows();
                }
            });

            // RETURN
            return {
                t,
                // HELPERS
                capitalize,
                // LOCAL
                toggleWrapping,
                toggleShowPreview,
                // STATE
                state,
                csvSettings,
            };
        },
    };
</script>