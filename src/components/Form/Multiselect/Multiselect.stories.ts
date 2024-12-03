import type { Meta, StoryObj } from '@storybook/vue3';

import Multiselect from './Multiselect.vue';
import { ref } from 'vue';

const meta: Meta<typeof Multiselect> = {
  component: Multiselect,
};

export default meta;

type Story = StoryObj<typeof Multiselect>;

export const Default: Story = {
  args: {
    options: ['Apfel', 'Birne', 'Banane', 'Kiwi'],
    value: ['Apfel'],
  },
  render: (args : any) => ({
    components: { Multiselect },
    setup() {
        
        const model = ref(args.value);
        return { args, model };
    },
    template: '<Multiselect v-bind="args" v-model="model" />',
  }),
};

export const Multiple: Story = {
    args: {
      options: ['Apfel', 'Birne', 'Banane', 'Kiwi'],
      value: ['Birne', 'Kiwi'],
      multiple: true,
    },
    render: (args : any) => ({
      components: { Multiselect },
      setup() {
          
          const model = ref(args.value);
          return { args, model };
      },
      template: '<Multiselect v-bind="args" v-model="model" />',
    }),
  };