import type { Meta, StoryObj } from '@storybook/vue3';

import Toggle from './Toggle.vue';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    // Add props here
  },
  render: (args : any) => ({
    components: { Toggle },
    setup() {
        return { args };
    },
    template: '<Toggle v-bind="args" />',
  }),
};