import type { Meta, StoryObj } from '@storybook/vue3';

import Float from './Float.vue';

const meta: Meta<typeof Float> = {
  component: Float,
};

export default meta;

type Story = StoryObj<typeof Float>;

export const Default: Story = {
  args: {
    // Add props here
    modelValue: 150,
  },
  render: (args : any) => ({
    components: { Float },
    setup() {
        return { args };
    },
    template: '<Float v-bind="args" />',
  }),
};