import type { Meta, StoryObj } from '@storybook/vue3';

import Separator from './Separator.vue';

const meta: Meta<typeof Separator> = {
  component: Separator,
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Default: Story = {
    args: {
        disabled: false,
    },
};

export const WithLabel: Story = {
    args: {
        disabled: false,
        defaultValue: {
            id: 65,
            label: 'Non-Default Separator'
        },
    },
};