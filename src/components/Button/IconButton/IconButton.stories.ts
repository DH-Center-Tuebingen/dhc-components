

import type { Meta, StoryObj } from '@storybook/vue3';

import IconButton from './IconButton.vue';
import { faEnvelope, faEnvelopeOpen, faFaceSmileWink } from '@fortawesome/free-solid-svg-icons';
import { onMounted, ref, watch } from 'vue';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';
import { findIconDefinition } from 'node_modules/@fortawesome/fontawesome-svg-core';

/**
 * Use the IconButton component if you need a button only with a single icon.
 * This button supports loading, custom styling and can be used as a toggle, by passing a v-model.
 * 
 */
const meta: Meta<typeof IconButton> = {
    component: IconButton,
};


export default meta;

type Story = StoryObj<typeof IconButton>;

interface Args {
    [key: string]: any
}

function iconLookup(args: Args, name: string): Args {
    if (!args[name]) { throw new Error(`IconButton: ${name} prop is required`); }
    args[name] = findIconDefinition(args[name]);
    return args;
}

export const Default: Story = {
    args: {
        // Add props here
        icon: 'faFaceSmile',
    },
    render: (args: any) => ({
        components: { IconButton },
        setup() {
            return { args };
        },
        template: '<IconButton v-bind="args" />',
    }),
};

export const Disabled: Story = {
    args: {
        // Add props here
        icon: 'faFaceSadCry',
        disabled: true,
    },
    render: (args: any) => ({
        components: { IconButton },
        setup() {
            iconLookup(args, 'icon');
            return { args };
        },
        template: '<IconButton v-bind="args" />',
    }),
};

export const Toggle: Story = {
    args: {
        // Add props here
        icon: 'faFaceMehBlank',
        activeIcon: faFaceSmileWink,
    },
    render: (args: any) => ({
        components: { IconButton },
        setup() {
            const modelValue = ref(false);
            iconLookup(args, 'icon');
            return { args, modelValue };
        },
        template: '<IconButton v-bind="args" v-model="modelValue" />',
    }),
};

export const IconSlot: Story = {
    args: {
        // Add props here
        icon: 'faFaceMehBlank',
        activeIcon: 'faFaceSmileWink',
    },
    render: (args: any) => ({
        components: { IconButton, FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText },
        setup() {
            const modelValue = ref(false);
            iconLookup(args, 'icon');
            iconLookup(args, 'activeIcon');
            const icons = {
                faEnvelope: faEnvelope,
                faEnvelopeOpen: faEnvelopeOpen,
            }
            return { args, modelValue, icons };
        },
        template: `
            <IconButton v-bind="args" v-model="modelValue" >
                <template #icon={active}>
                    <template v-if="active">
                        <FontAwesomeLayers full-width>
                            <FontAwesomeIcon :icon="icons.faEnvelope" transform="down-2 grow-3" />
                            <FontAwesomeLayersText counter value="100" transform="shrink-7 right-28 down-4"  />
                        </FontAwesomeLayers>
                    </template>
                    <template v-else>
                        <FontAwesomeLayers full-width>
                            <FontAwesomeIcon :icon="icons.faEnvelopeOpen" transform="grow-3"/>
                        </FontAwesomeLayers>
                    </template>
                </template>
            </IconButton>
        `,
    }),
};

export const Loading: Story = {
    args: {
        // Add props here
        icon: 'faFaceSmile',
        loading: true,
    },
    render: (args: any) => ({
        components: { IconButton },
        setup() {
            iconLookup(args, 'icon');

            const loading = ref(args.loading.value);
            const loadingTimeout = ref<NodeJS.Timeout | null>(null);
            const clicked = () => setLoadingTimeout()

            onMounted(() => {
                if (args.loading) {
                    setLoadingTimeout();
                }
            });

            const setLoadingTimeout = () => {
                if (loading.value) { return; }
                loading.value = true;
                loadingTimeout.value = setTimeout(() => {
                    loading.value = false;
                    loadingTimeout.value = null;
                    // args.loading.value = false;
                }, 2000);
            }

            watch(() => args.loading, (newValue) => {
                if (loading.value !== newValue && newValue === true) {
                    setLoadingTimeout();
                }
            });

            return { args, clicked, loading };
        },
        template: '<IconButton v-bind="args" :loading="loading" v-model="modelValue" @click="clicked" />',
    }),
};