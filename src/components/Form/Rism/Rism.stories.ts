import type { Meta, StoryObj } from '@storybook/vue3';

import Rism from './Rism.vue';

const meta: Meta<typeof Rism> = {
  component: Rism,
};

export default meta;

type Story = StoryObj<typeof Rism>;

export const Default: Story = {
    args: {
        disabled: false,
        defaultValue: '600176222',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: '600176222',
    },
};

export const German: Story = {
    args: {
        disabled: false,
        defaultValue: '600176222',
        metadata: {
            language: 'de'
        },
    },
};