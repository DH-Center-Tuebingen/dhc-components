

import type { Meta, StoryObj } from '@storybook/vue3';

import IconButton from './IconButton.vue';
import { faEnvelope, faEnvelopeOpen, faFaceMehBlank, faFaceSadCry, faFaceSmile, faFaceSmileWink, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { onMounted, ref, watch } from 'vue';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

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

export const Default: Story = {
    args: {
        // Add props here
    },
    render: (args: any) => ({
        components: { IconButton },
        setup() {
            args.icon = faFaceSmile;
            return { args };
        },
        template: '<IconButton v-bind="args" />',
    }),
};

export const Stacked: Story = {
    args: {
        icons: {
            type: 'fa-layers',
            classes: ['fa-fw'],
            items: [
                {
                    icon: faCircle,
                    transforms: ['shrink-2', 'up-1', 'left-2'],
                    style: { opacity: 0.5 },
                },
                {
                    icon: faCircleCheck,
                    transforms: ['shrink-2', 'down-1', 'right-2'],
                }
            ]
        },
        title: 'Stacked Action Button'
    },
    render: (args: any) => ({
        components: { IconButton },
        setup() {
            return { args };
        },
        template: '<IconButton v-bind="args" />',
    }),
};

export const Small: Story = {
    args: {
        // Add props here
        small: true,
    },
    render: (args: any) => ({
        components: { IconButton },
        setup() {
            args.icon = faFaceSmile;
            return { args };
        },
        template: '<IconButton v-bind="args" />',
    }),
};

export const Disabled: Story = {
    args: {
        // Add props here
        disabled: true,
    },
    render: (args: any) => ({
        components: { IconButton },
        setup() {
            args.icon = faFaceSadCry;
            return { args };
        },
        template: '<IconButton v-bind="args" />',
    }),
};

export const Toggle: Story = {
    args: {
    },
    render: (args: any) => ({
        components: { IconButton },
        setup() {
            args.icon = faFaceMehBlank;
            args.activeIcon = faFaceSmileWink;

            const modelValue = ref(true);

            watch(() => args.modelValue, (newValue) => {
                if(modelValue.value !== newValue) {
                    modelValue.value = newValue;
                }
            })

            return { args, modelValue };
        },
        template: '<IconButton v-bind="args" v-model="modelValue" />',
    }),
};

export const IconSlot: Story = {
    args: {
        // Add props here
    },
    render: (args: any) => ({
        components: {
            IconButton,
            FontAwesomeIcon,
            FontAwesomeLayers,
            FontAwesomeLayersText
        },
        setup() {
            const modelValue = ref(false);
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
                            <FontAwesomeLayersText counter value="100" transform="shrink-7 right-28 down-4" />
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
        loading: true,
    },
    render: (args: any) => ({
        components: { IconButton },
        setup() {
            args.icon = faFaceSmile;

            const loading = ref(args.loading.value);
            const loadingTimeout = ref<NodeJS.Timeout | null>(null);
            const clicked = () => setLoadingTimeout()

            onMounted(() => {
                if(args.loading) {
                    setLoadingTimeout();
                }
            });

            const setLoadingTimeout = () => {
                if(loading.value) { return; }
                loading.value = true;
                loadingTimeout.value = setTimeout(() => {
                    loading.value = false;
                    loadingTimeout.value = null;
                    // args.loading.value = false;
                }, 2000);
            }

            watch(() => args.loading, (newValue) => {
                if(loading.value !== newValue && newValue === true) {
                    setLoadingTimeout();
                }
            });

            return { args, clicked, loading };
        },
        template: '<IconButton v-bind="args" :loading="loading" v-model="modelValue" @click="clicked" />',
    }),
};

/**
 *
 */
export const Active: Story = {
    args: {
        // Add props here
        loading: true,
    },
    render: (args: any) => ({
        components: { IconButton },
        setup() {

            const icons = [
                faFaceSmile,
                faFaceSmileWink,
                faFaceSadCry,
                faFaceMehBlank,
            ]
            const mappedIcons = icons.map((icon, id) => ({id, icon}));

            const selectedIcon = ref(0);

            return { args, mappedIcons, selectedIcon};
        },
        template: `
        <div class="d-flex gap-2 align-items-center">
            <div class="d-flex align-items-center text-center fw-bold">{{selectedIcon}}</div>
            <IconButton v-for="icon in mappedIcons" :key="icon.id" :icon="icon.icon" :key="icon.id" @click="()=>selectedIcon=icon.id" :active="selectedIcon === icon.id"/>
        </div>`,
    }),
};

export const Unbutton: Story = {
    args: {
        // Add props here
        small: true,
        unbutton: true,
    },
    render: (args: any) => ({
        components: { IconButton },
        setup() {
            args.icon = faFaceSmile;
            return { args };
        },
        template: '<IconButton v-bind="args" />',
    }),
};

export const UnbuttonActive: Story = {
    args: {
        // Add props here
        active: true,
        small: true,
        unbutton: true,
    },
    render: (args: any) => ({
        components: { IconButton },
        setup() {
            args.icon = faFaceSmile;
            return { args };
        },
        template: '<IconButton v-bind="args" />',
    }),
};