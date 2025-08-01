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