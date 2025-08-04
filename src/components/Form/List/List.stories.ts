import type { Meta, StoryObj } from '@storybook/vue3';

import List from './List.vue';

const meta: Meta<typeof List> = {
  component: List,
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
    args: {
        disabled: false,
        defaultValue: ['A', 'B', 'C', 'An option with a link to https://github.com/DH-Center-Tuebingen/Spacialist'],
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: ['A', 'B', 'C'],
    },
};