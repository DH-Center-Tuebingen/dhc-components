<template>
    <form class="csv-settings form-control d-inline-flex flex-wrap align-items-center gap-2 order-1">
        <div class="line line-top d-flex flex-grow-1 justify-content-start align-items-center gap-2">
            <div class="input-group flex-nowrap">
                <span class="input-group-text">
                    {{ t('global.paginator.count') }}
                </span>
                <!-- <label
                for="row-count"
                class="visually-hidden"
            >
                {{ t('main.csv.uploader.nr_of_shown_rows') }}
            </label> -->
                <input
                    id="row-count"
                    v-model="showCount"
                    type="number"
                    class="form-control"
                    min="0"
                    step="1"
                    :style="paginatorInputStyle"
                    :placeholder="t('main.csv.uploader.nr_of_shown_rows')"
                >

                <!-- <label
                for="skipped-row-count"
                class="visually-hidden"
            >
                {{ t('main.csv.uploader.nr_of_skipped_rows') }}
            </label> -->
                <span class="input-group-text">
                    {{ t('global.paginator.skip') }}
                </span>
                <input
                    id="skipped-row-count"
                    v-model="skippedCount"
                    type="number"
                    class="form-control"
                    :style="paginatorInputStyle"
                    min="0"
                    :max="total"
                    step="1"
                    :placeholder="t('main.csv.uploader.nr_of_skipped_rows')"
                >
                <span class="input-group-text">
                    {{ rangeInformationText }}
                </span>
            </div>
        </div>
        <div
            class="line line-bottom d-flex flex-grow-1 justify-content-start align-items-center gap-2 flex-wrap basis-fit-content order-2">
            <div
                class="delimiter-group input-group flex-grow-1 flex-nowrap basis-fit-content"
                style="max-width: 250px;"
            >
                <label
                    class="input-group-text"
                    for="delimiter"
                    style="height: 42px;"
                >
                    {{ t('main.csv.uploader.delimiter') }}
                </label>
                <input
                    v-if="useCustomDelimiter"
                    id="delimiter"
                    v-model="delimiter"
                    type="text"
                    class="form-control"
                    :placeholder="t('main.csv.uploader.delimiter_with_info')"
                    :style="delimiterInputStyle"
                >
                <Multiselect
                    v-else
                    v-model:delimiter="delimiter"
                    :options="delimiterOptions"
                    :can-deselect="false"
                    :can-clear="false"
                    :style="delimiterInputStyle"
                />
                <button
                    class="btn btn-outline-secondary"
                    type="button"
                    style="border-left-width: 2px;"
                    @click="changeCustomDelimiter"
                >
                    <span v-if="useCustomDelimiter">
                        <i class="far fa-fw fa-rectangle-list" />
                    </span>
                    <span v-else>
                        <i class="far fa-fw fa-keyboard" />
                    </span>
                </button>
            </div>

            <div class="form-check form-switch">
                <input
                    id="has-header"
                    v-model="hasHeaderRow"
                    class="form-check-input"
                    type="checkbox"
                >
                <label
                    class="form-check-label"
                    for="has-header"
                >
                    {{ t('main.csv.uploader.has_header') }}
                </label>
            </div>
            <div class="form-check form-switch">
                <input
                    id="show-linenumbers"
                    v-model="showLineNumbers"
                    class="form-check-input"
                    type="checkbox"
                >
                <label
                    class="form-check-label"
                    for="show-linenumbers"
                >
                    {{ t('main.csv.uploader.show_linenumbers') }}
                </label>
            </div>

            <IconButton
                icon="eye"
                alt-icon="eye-slash"
                v-model="showPreview"
            />

            <button
                v-if="removable"
                class="btn btn-outline-danger"
                type="button"
                style="border-left-width: 2px;"
                @click="() => emit('remove')"
            >
                {{ t('global.remove_file') }}
            </button>
        </div>
    </form>
</template>
<script setup lang="ts">
    import { computed, ModelRef, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import IconButton from '@/components/Button/IconButton/IconButton.vue';

    const props = withDefaults(defineProps<{
        total: number,
        removable: boolean
        showPreviewButton: boolean,
    }>(), {
        showPreviewButton: false,
    });

    const delimiter: ModelRef<string, string> = defineModel('delimiter', { default: ',' });
    const hasHeaderRow: ModelRef<boolean, PropertyKey> = defineModel('hasHeaderRow', { default: true });
    const showLineNumbers: ModelRef<boolean, PropertyKey> = defineModel('showLineNumbers', { default: true });
    const showPreview: ModelRef<boolean, PropertyKey> = defineModel('showPreview', { default: true });
    const useCustomDelimiter: ModelRef<boolean, PropertyKey> = defineModel('useCustomDelimiter', { default: false });
    const showCount: ModelRef<number, PropertyKey> = defineModel('showCount', { default: 20 });
    const skippedCount: ModelRef<number, PropertyKey> = defineModel('skippedCount', { default: 0 });
    // const maxRows: ModelRef<number, PropertyKey> = defineModel('maxRows', { default: 100 });

    const emit = defineEmits([
        'remove',
    ]);

    const { t } = useI18n();

    const delimiterOptions = ref([
        { value: ',', label: ',' },
        { value: ';', label: ';' },
        { value: '\t', label: t('keyboard.tab') },
        { value: ' ', label: t('keyboard.space') },
    ]);

    const delimiterInputStyle = ref({
        width: '5em',
        minWidth: '5em',
        flex: '1 1 min-content',
        zIndex: 500,
    });

    const rangeInformationText = computed(() => {
        const start = skippedCount.value + 1;
        let end = skippedCount.value + showCount.value;
        if (end > props.total) {
            end = props.total;
        }

        return `${start}-${end} ${t('global.paginator.of')} ${props.total}`;
    });

    const paginatorInputStyle = ref({
        minWidth: '5em',
    });

    const changeCustomDelimiter = () => {
        if (useCustomDelimiter.value) {
            const delimiterExists = delimiterOptions.value.find(option => option.value === delimiter.value);
            if (!delimiterExists) {
                delimiter.value = delimiterOptions.value[0].value;
            }
        }

        useCustomDelimiter.value = !useCustomDelimiter.value;
    };
</script>