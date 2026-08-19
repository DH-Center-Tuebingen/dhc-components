import type { Meta, StoryObj } from '@storybook/vue3';

import Dropdown from './Dropdown.vue';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    // Add props here
  },
  render: (args : any) => ({
    components: { Dropdown },
    setup() {
        return { args };
    },
    template: '<Dropdown v-bind="args" />',
  }),
};