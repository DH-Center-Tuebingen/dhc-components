import type { Meta, StoryObj } from '@storybook/vue3';

import TWT from './ThreeWayToggle.vue';

const meta: Meta<typeof TWT> = {
  component: TWT,
};

export default meta;

type Story = StoryObj<typeof TWT>;

export const Default: Story = {
  args: {
      initialValue: undefined,
  },
};