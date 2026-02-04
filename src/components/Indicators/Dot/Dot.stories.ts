import type { Meta, StoryObj } from '@storybook/vue3';

import Dot from './Dot.vue';

const meta: Meta<typeof Dot> = {
  component: Dot,
};

export default meta;

type Story = StoryObj<typeof Dot>;

export const Default: Story = {
  args: {
        type: 'success',
        opacity: 4,
  },
};

export const SquareWarning: Story = {
  args: {
        size: '1rem',
        type: 'warning',
        opacity: 2,
        classes: '',
  },
};