import type { Meta, StoryObj } from '@storybook/vue3';

import WKT from './WKT.vue';

const meta: Meta<typeof WKT> = {
  component: WKT,
};

export default meta;

type Story = StoryObj<typeof WKT>;

export const Default: Story = {
  args: {
    // Add props here
    value: 'POINT(1 2)',
  },
  render: (args: any) => ({
    components: { WKT },
    setup() {
      return { args };
    },
    template: '<WKT v-bind="args" />',
  }),
};