import type { Meta, StoryObj } from '@storybook/vue3';

import Dimension from './Dimension.vue';

const meta: Meta<typeof Dimension> = {
  component: Dimension,
};

export default meta;

type Story = StoryObj<typeof Dimension>;

export const Default: Story = {
    args: {
        defaultValue: {
            B: 1,
            H: 2,
            T: 3,
            unit: 'm'
        }
    },
};