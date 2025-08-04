<template>
    <div class="was-validated">
        <div class="input-group">
            <button
                type="button"
                class="btn btn-outline-secondary"
                @click="toggleList()"
            >
                <div v-show="!expanded">
                    <FontAwesomeIcon
                        :icon="faCaretUp"
                    />
                    <span v-if="validatedValue.length">
                        ({{ validatedValue.length }})
                    </span>
                </div>
                <div v-show="expanded">
                    <FontAwesomeIcon
                        :icon="faCaretDown"
                    />
                </div>
            </button>
            <input
                v-model="inputValue"
                type="text"
                class="form-control"
                :disabled="disabled"
                @keydown.enter="addListEntry()"
            >
            <button
                v-if="!disabled"
                type="button"
                class="btn btn-outline-success"
                :disabled="!valid"
                @click="addListEntry()"
            >
                <FontAwesomeIcon
                    :icon="faPlus"
                />
            </button>
        </div>
        <ul
            v-if="expanded && validatedValue.length"
            class="mt-2 mb-0 list-group"
        >
            <li
                v-for="(l, i) in validatedValue"
                class="list-group-item d-flex flex-row align-items-center gap-3"
                :key="i"
                @mouseenter="hoverOver(i)"
                @mouseleave="hoverOver(i, false)"
            >
                <div
                    class="text-center list-counter"
                >
                    <span
                        v-show="hovering !== i"
                        class="text-body-tertiary"
                    >
                        {{ i + 1 }}
                    </span>

                    <a
                        v-if="!disabled"
                        v-show="hovering === i"
                        href="#"
                        class="text-danger"
                        @click.prevent="removeListEntry(i)"
                    >
                        <FontAwesomeIcon
                            :icon="faTrash"
                        />
                    </a>
                </div>
                <div>
                    {{ l }}
                    <div
                        v-if="extractUrls(l)"
                        class="small text-body-tertiary"
                        :class="{'opacity-50': hovering !== i}"
                    >
                        <ol>
                            <li
                                v-for="(url, index) in extractUrls(l)"
                                :key="`${url}-${index}`"
                            >
                                <a :href="url" target="_blank">
                                    {{ url }}
                                    <FontAwesomeIcon
                                        class="small ms-1"
                                        :icon="faExternalLinkAlt"
                                    />
                                </a>
                            </li>
                        </ol>
                    </div>
                </div>
            </li>
        </ul>
        <div class="invalid-feedback">
            <span
                v-for="(msg, i) in validationErrors"
                :key="i"
            >
                {{ msg }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed, onMounted, ref } from 'vue';

    import { useField } from 'vee-validate';

    import { initI18n } from '../../../i18n/i18n';

    import { array } from '../validation/rulesets';

    import * as de from './i18n/de.json';
    import * as en from './i18n/en.json';

    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCaretUp, faCaretDown, faPlus, faTrash, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

    import { ListProps } from './definitions';

    onMounted(() => {
        setInitialValue();
    });

    const props = withDefaults(defineProps<ListProps>(), {
        name: 'String',
        disabled: false,
        required: false,
        defaultValue: () => [] as string[],
    });

    const emit = defineEmits(['change']);

    const messages = {
        de,
        en,
    };
    const i18n = initI18n(messages);
    const t = i18n.global.t;

    const expanded = ref(false);
    const inputValue = ref('');
    const hovering = ref(-1);
    const valid = computed(() => {
        return inputValue.value.length > 0;
    });
    const isDirty = computed(() => {
        if(props.defaultValue.length != validatedValue.value.length) {
            return true;
        }

        return props.defaultValue.some((value, index) => value !== validatedValue.value[index]);
    });

    const extractUrls = (text: string) => {
        if(!text) {
            return [];
        }
        const urlRegex = /(\b((https?):\/\/|www\.)[-A-Z0-9+#&=?@%_.]*[-A-Z0-9+#&=?@%_/]+)/ig;

        return text.match(urlRegex);
    };

    const setInitialValue = () => {
        return props.defaultValue.slice() || [];
    };

    const reset = (value: string[]) => {
        value = value || props.defaultValue.slice();
        resetField({
            value: value,
        });
    };

    const undirty = (value: string[]) => {
        value = value || validatedValue.value;
        reset(value);
    };

    const hoverOver = (index: number, state: boolean = true) => {
        hovering.value = state ? index : -1;
    };

    const toggleList = () => {
        expanded.value = !expanded.value;
    };

    const addListEntry = () => {
        validatedValue.value.push(inputValue.value);
        inputValue.value = '';
        handleInput();
    };

    const removeListEntry = (index: number) => {
        validatedValue.value.splice(index, 1);
        handleInput();
    };

    const handleInput = () => {
        handleChange(validatedValue.value);
        console.log(props.defaultValue, validatedValue.value);
        console.log("[List] changed value to", meta.valid, meta.dirty, validatedValue.value);
        emit('change', {
            valid: meta.valid,
            dirty: isDirty,
            value: validatedValue.value,
        });
    };

    let rules = array();
    if(props.required) {
        rules = rules.required();
    }
    const {
        value: validatedValue,
        errors: validationErrors,
        meta,
        resetField,
        handleChange,
    } = useField(`list_${props.name}`, rules, {
        initialValue: setInitialValue(),
    });
</script>

<style scoped>
    .list-counter {
        width: 2rem;
    }
</style>