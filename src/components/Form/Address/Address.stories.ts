import type { Meta, StoryObj } from '@storybook/vue3';

import Address from './Address.vue';

const meta: Meta<typeof Address> = {
  component: Address,
};

export default meta;

type Story = StoryObj<typeof Address>;

export const Default: Story = {
    args: {
        disabled: false,
        defaultValue: {},
    },
};