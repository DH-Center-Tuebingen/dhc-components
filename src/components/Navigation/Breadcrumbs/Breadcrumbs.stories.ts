import type { Meta, StoryObj } from '@storybook/vue3';

import Breadcrumbs from './Breadcrumbs.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEarthEurope } from '@fortawesome/free-solid-svg-icons';


const meta: Meta<typeof Breadcrumbs> = {
    component: Breadcrumbs,
};

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

const Tuebingen = [
    'Europe',
    'Germany',
    'Baden-Württemberg',
    'Tübingen'
]

export const Default: Story = {
    args: {
        path: Tuebingen.slice(),
    },
    render: (args: any) => ({
        components: { Breadcrumbs },
        setup() {
            return { args };
        },
        template: '<Breadcrumbs v-bind="args" />',
    }),
};

export const Before: Story = {
    args: {
        path: Tuebingen.slice(),
        before: ['World'],
    },
    render: (args: any) => ({
        components: {
            Breadcrumbs,
            FontAwesomeIcon,
        },
        setup() {
            return { args, faEarthEurope };
        },
        template: `<Breadcrumbs v-bind="args" />`,
    }),
};

export const BeforeWithSlot: Story = {
    args: {
        path: Tuebingen.slice(),
        before: ['World'],
    },
    render: (args: any) => ({
        components: {
            Breadcrumbs,
            FontAwesomeIcon,
        },
        setup() {
            return { args, faEarthEurope };
        },
        template: `<Breadcrumbs v-bind="args">
            <template #beforeItem="{ item, index }">
                Slot with Index: <strong>{{ index }} </strong> | and Item: <strong>{{ item }}</strong> | Example Icon: 
                <FontAwesomeIcon :icon="faEarthEurope" />
            </template>
        </Breadcrumbs>`,
    }),
};

export const CustomClasses: Story = {
    args: {
        path: Tuebingen.slice(),
        before: ['World'],
        crumbClasses: 'rounded border border-2 border-danger text-danger px-2 py-1',
        crumbActiveClasses: 'rounded border border-2 border-danger text-danger px-2 py-1 bg-danger text-white',
    },
    render: (args: any) => ({
        components: {
            Breadcrumbs,
            FontAwesomeIcon,
        },
        setup() {
            return { args, faEarthEurope };
        },
        template: `<Breadcrumbs v-bind="args" />`,
    }),
};