import type { Meta, StoryObj } from '@storybook/vue3';

import Multiselect from './Multiselect.vue';
import { ref } from 'vue';

const meta: Meta<typeof Multiselect> = {
  component: Multiselect,
};

export default meta;

type Story = StoryObj<typeof Multiselect>;

const options: Array<any> = [
    {
        id: 1,
        label: 'Apfel',
    },
    {
        id: 2,
        label: 'Birne',
    },
    {
        id: 3,
        label: 'Banane',
    },
    {
        id: 4,
        label: 'Kiwi',
    }
];

export const Default: Story = {
  args: {
    options: options,
    defaultValue: {id: 1, label: 'Apfel'},
  },
};

export const Multiple: Story = {
    args: {
      options: options,
      defaultValue: [{id: 2, label: 'Birne'}, {id: 4, label: 'Kiwi'}],
      mode: 'multiple',
    },
  };