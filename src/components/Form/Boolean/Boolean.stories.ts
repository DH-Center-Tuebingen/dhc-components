import type { Meta, StoryObj } from '@storybook/vue3';

import Boolean from './Boolean.vue';

const meta: Meta<typeof Boolean> = {
  component: Boolean,
};

export default meta;

type Story = StoryObj<typeof Boolean>;

export const Default: Story = {
    args: {
        disabled: false,
        defaultValue: true,
        showText: true,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: true,
        showText: true,
    },
};

export const NoText: Story = {
    args: {
        disabled: false,
        defaultValue: false,
        showText: false,
    },
};

export const Unset: Story = {
    args: {
        disabled: false,
        defaultValue: null,
        showText: true,
    },
};