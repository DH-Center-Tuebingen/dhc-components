import type { Meta, StoryObj } from '@storybook/vue3';

import NumberBase from './NumberBase.vue';

const meta: Meta<typeof NumberBase> = {
  component: NumberBase,
};

export default meta;

type Story = StoryObj<typeof NumberBase>;

export const Default: Story = {
    args: {
        disabled: false,
        defaultValue: 1.337,
        float: true,
    },
};

export const Integer: Story = {
    args: {
        disabled: false,
        defaultValue: 1337,
        float: false,
    },
};