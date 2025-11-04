<template>
    <div
        class="position-relative"
        :class="classes"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <Teleport
            v-if="validatedValue || editMode"
            :disabled="!zenMode"
            to="body"
        >
            <Transition name="modal">
                <div
                    v-if="zenMode"
                    class="backdrop bg-dark bg-opacity-50 position-absolute top-0 start-0 w-100 h-100"
                />
            </Transition>
            <div
                :class="dynamicClasses"
                :style="dynamicStyles"
            >
                <MarkdownEditor
                    :id="name"
                    :data="defaultValue"
                    :readonly="!editMode"
                    :additional-tools="richtextTools"
                    @update="handleInput"
                />
            </div>
        </Teleport>
        <div
            v-else
            class="text-secondary fst-italic fw-medium opacity-50 user-select-none"
        >
            {{ t('no_content') }}
        </div>
        <div
            v-if="!editMode"
            class="position-absolute top-0 end-0 h-100 pe-none"
            :class="onHoverBtnClasses"
        >
            <div class="position-sticky top-0 bg-light pe-auto m-2 rounded">
                <button
                    v-if="!disabled"
                    class="btn btn-outline-secondary btn-sm d-flex flex-row gap-1 align-items-center"
                    href="#"
                    @click.prevent="setEditMode(true)"
                >
                    <FontAwesomeIcon :icon="faEdit" />
                    <span>
                        {{ globalT('global.edit') }}
                    </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {
        computed,
        onMounted,
        onUnmounted,
        ref,
    } from 'vue';

    import { useField } from 'vee-validate';

    import { useI18n } from 'vue-i18n';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import {
        faArrowsToEye,
        faEdit,
    } from '@fortawesome/free-solid-svg-icons';

    import { Tool } from '@/components/Layout/Toolbar/definitions';
    import MarkdownEditor from '../../Display/Markdown/Markdown.vue';

    import { initI18n } from '../../../i18n/i18n';

    import {
        mixed,
        string,
    } from '../validation/rulesets';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { RichtextProps } from './definitions';

    onMounted(() => {
        setInitialValue();

        window.addEventListener('keydown', handleKeydown);
    });

    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeydown);
    });

    const props = withDefaults(defineProps<RichtextProps>(), {
        name: 'Richtext',
        disabled: false,
        required: false,
        defaultValue: '',
    });

    const emit = defineEmits(['change']);

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;
    const {
        t: globalT,
    } = useI18n();

    const classes = 'mt-0 bg-none h-100 form-control px-4 py-3';

    const isHovered = ref(false);
    const editMode = ref(false);
    const zenMode = ref(false);

    const zenModeBtnClass = computed(() => {
        return zenMode.value ?  'link': 'text-primary';
    });

    const dynamicClasses = computed(() => {
        const classes = [];
        if(zenMode.value) {
            classes.push('w-75 h-75 position-absolute start-0 end-0 m-auto top-50');
        } else {
            classes.push('w-100 h-100');
        }
        return classes;
    });

    const dynamicStyles = computed(() => {
        const styles = {};
        if(zenMode.value) {
            styles.transform = 'translateY(-50%)';
        }
        return styles;
    });

    const richtextTools: Tool[] = [
        {
            name: 'zenmode',
            action: () => setZenMode(!zenMode.value),
            icon: faArrowsToEye,
            class: zenModeBtnClass,
        },
        {
            name: 'editmode',
            action: () => setEditMode(false),
            icon: faEdit,
        },
    ];

    const onHoverBtnClasses = computed(() => {
        if(isHovered.value) {
            return '';
        } else {
            return 'd-none';
        }
    });

    const setInitialValue = () => {
        return props.defaultValue || '';
    };

    const setEditMode = (state: boolean) => {
        editMode.value = state;
    };

    const setZenMode = (state: boolean) => {
        zenMode.value = state;
    };

    const reset = (value: string) => {
        value = value || props.defaultValue;
        resetField({
            value: value,
        });
    };

    const undirty = (value: string) => {
        value = value || validatedValue.value;
        reset(value);
    };

    const handleInput = (data: string) => {
        handleChange(data);
        emit('change', {
            valid: meta.valid,
            dirty: meta.dirty,
            value: validatedValue.value,
        });
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if(event.key == 'Escape') {
            setZenMode(false);
        }
    };

    let rules = string();
    if(props.required) {
        rules = rules.required();
    }
    const {
        value: validatedValue,
        meta,
        resetField,
        handleChange,
    } = useField(`richtext_${props.name}`, mixed(), {
        initialValue: setInitialValue(),
    });
</script>

<style scoped>
    .backdrop {
        backdrop-filter: blur(1px);
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
    }
    .modal-enter-active,
    .modal-leave-active {
        transition: opacity 0.3s ease;
    }
</style>