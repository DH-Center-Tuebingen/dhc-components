import type { Meta, StoryObj } from '@storybook/vue3';

import ResizableColumns from './ResizableColumns.vue';
import { reactive } from 'vue';

const meta: Meta<typeof ResizableColumns> = {
  component: ResizableColumns,
};

export default meta;

type Story = StoryObj<typeof ResizableColumns>;

export const Default: Story = {
  args: {
    // Add additional args
  },
  render: (args: any) => ({
    components: { ResizableColumns },
    setup() {
      const vModel = reactive([
        { name: 'Column 1', width: 100, style: 'background-color: #f00' },
        { name: 'Column 2', width: 200 },
        { name: 'Column 3', width: 300, style: 'background-color: #00f' },
      ]);
      return { args, vModel };
    },
    template: '<ResizableColumns v-bind="args" v-model="vModel" />',
  }),
};