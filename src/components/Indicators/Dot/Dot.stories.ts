import type { Meta, StoryObj } from '@storybook/vue3';

import Dot from './Dot.vue';

const meta: Meta<typeof Dot> = {
  component: Dot,
};

export default meta;

type Story = StoryObj<typeof Dot>;

export const Default: Story = {
  args: {
        size: '0.6rem',
        type: 'success',
        classes: 'rounded-circle ratio ratio-1x1',
        opacity: 4,
  },
};