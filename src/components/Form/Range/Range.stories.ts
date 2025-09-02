import type { Meta, StoryObj } from '@storybook/vue3';

import Range from './Range.vue';

const meta: Meta<typeof Range> = {
  component: Range,
};

export default meta;

type Story = StoryObj<typeof Range>;

export const Default: Story = {
    args: {
        disabled: false,
        defaultValue: 12,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultValue: 37,
    },
};

export const BarrelSize: Story = {
    args: {
        disabled: false,
        defaultValue: 25,
        metadata: {
            min: 10,
            max: 400,
            step: 15,
            unit: 'Litres',
        }
    },
};