import type { Meta, StoryObj } from '@storybook/vue3';

import Spinner from './LoadingSpinner.vue';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: '2x',
  }, 
};
