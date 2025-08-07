import type { Meta, StoryObj } from '@storybook/vue3';

import Iconclass from './Iconclass.vue';

const meta: Meta<typeof Iconclass> = {
  component: Iconclass,
};

export default meta;

type Story = StoryObj<typeof Iconclass>;

export const Default: Story = {
    args: {
        disabled: false,
        defaultValue: '71H136',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: '71H136',
    },
};

export const German: Story = {
    args: {
        disabled: false,
        defaultValue: '71H136',
        metadata: {
            language: 'de',
        },
    },
};