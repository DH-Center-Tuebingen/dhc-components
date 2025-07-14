import type { Meta, StoryObj } from '@storybook/vue3';

import Integer from './Integer.vue';

const meta: Meta<typeof Integer> = {
  component: Integer,
};

export default meta;

type Story = StoryObj<typeof Integer>;

export const Default: Story = {
    args: {
        disabled: false,
        defaultValue: 42,
    },
};