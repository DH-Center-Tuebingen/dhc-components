import type { Meta, StoryObj } from '@storybook/vue3';

import Double from './Double.vue';

const meta: Meta<typeof Double> = {
  component: Double,
};

export default meta;

type Story = StoryObj<typeof Double>;

export const Default: Story = {
    args: {
        disabled: false,
        defaultValue: 1.337,
    },
};