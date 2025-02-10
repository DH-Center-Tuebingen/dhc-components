import type { Meta, StoryObj } from '@storybook/vue3';

import Csv from './Csv.vue';

const meta: Meta<typeof Csv> = {
  component: Csv,
};

export default meta;

type Story = StoryObj<typeof Csv>;

export const Default: Story = {
  args: {
    content: 'a,b,c\n1,2,3\n4,5,6',
  },
  render: (args : any) => ({
    components: { Csv },
    setup() {
        return { args };
    },
    template: '<Csv v-bind="args" />',
  }),
};