import type { Meta, StoryObj } from '@storybook/vue3';

import Datepicker from './Datepicker.vue';

const meta: Meta<typeof Datepicker> = {
  component: Datepicker,
};

export default meta;

type Story = StoryObj<typeof Datepicker>;

export const Default: Story = {
    args: {
        name: 'datepicker',
        mode: '',
        disabled: false,
        value: '01.05.2025',
    },
};