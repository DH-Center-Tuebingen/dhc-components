import type { Meta, StoryObj } from '@storybook/vue3';

import String from './String.vue';

const meta: Meta<typeof String> = {
  component: String,
};

export default meta;

type Story = StoryObj<typeof String>;

export const Default: Story = {
    args: {
        disabled: false,
        defaultValue: 'Hello World!',
    },
};