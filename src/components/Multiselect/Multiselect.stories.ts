import type { Meta, StoryObj } from '@storybook/vue3';

import Multiselect from './Multiselect.vue';

const meta: Meta<typeof Multiselect> = {
  component: Multiselect,
};

export default meta;

type Story = StoryObj<typeof Multiselect>;

const testEpochs: Array<any> = [
    {
        id: 1,
        label: 'Stone Age'
    },
    {
        id: 2,
        label: 'Iron Age'
    },
    {
        id: 3,
        label: 'Bronze Age'
    },
];

export const Default: Story = {
  args: {
    options: testEpochs,
    name: 'Multiselect',
    disabled: false,
    defaultValue: {id: 1, label: 'Stone Age'},
    placeholder: 'Select an epoch',
    metadata: {
        asObject: true,
        valueProp: 'id',
        label: 'label',
    },
    multiple: false,
  },
  // render: (args : any) => ({
  //   components: { Multiselect },
  //   setup() {
  //       return { args };
  //   },
  //   template: '<Multiselect v-bind="args"></Multiselect>',
  // }),
};