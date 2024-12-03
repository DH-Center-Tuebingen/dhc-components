import type { Meta, StoryObj } from '@storybook/vue3';

import Csv from './Csv.vue';

const meta: Meta<typeof Csv> = {
  component: Csv,
};

export default meta;

type Story = StoryObj<typeof Csv>;

export const Default: Story = {
  args: {
    // Add props here
  },
  render: (args : any) => ({
    components: { Csv },
    setup() {
        return { args };
    },
    template: '<Csv v-bind="args" />',
  }),
};