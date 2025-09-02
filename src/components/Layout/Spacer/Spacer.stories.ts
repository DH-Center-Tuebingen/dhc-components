import { type Meta, type StoryObj } from '@storybook/vue3';

import Spacer from './Spacer.vue';

const meta: Meta<typeof Spacer> = {
    component: Spacer,
};

export default meta;

type Story = StoryObj<typeof Spacer>;

export const VerticalLine: Story = {
    args: {
        dir: 'vertical',
        width: 5,
    },
    render: (args: any) => ({
        components: { Spacer },
        setup() {
            return { args };
        },
        template: 'Item 1 <Spacer v-bind="args" /> Item 2 <Spacer v-bind="args" /> Item 3',
    }),
};

export const VerticalIcon: Story = {
    args: {
        dir: 'vertical',
        type: '❖',
        spacing: 4,
    },
    render: (args: any) => ({
        components: { Spacer },
        setup() {
            return { args };
        },
        template: 'Item 1 <Spacer v-bind="args" /> Item 2 <Spacer v-bind="args" /> Item 3',
    }),
};

export const Horizontal: Story = {
    args: {
        dir: 'horizontal',
    },
    render: (args: any) => ({
        components: { Spacer },
        setup() {
            return { args };
        },
        template: 'Item 1 <Spacer v-bind="args" /> Item 2 <Spacer v-bind="args" /> Item 3',
    }),
};