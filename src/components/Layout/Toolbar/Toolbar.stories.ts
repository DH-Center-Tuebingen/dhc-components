import type { Meta, StoryObj } from '@storybook/vue3';

import Toolbar from './Toolbar.vue';

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
};

export default meta;

type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  args: {
    // Add props here
  },
  render: () => ({
    components: { Toolbar },
    setup(args) {
        return { args };
    },
    template: '<Toolbar v-bind="args" />',
  }),
};