import type { Meta, StoryObj } from '@storybook/vue3';

import Serial from './Serial.vue';

const meta: Meta<typeof Serial> = {
  component: Serial,
};

export default meta;

type Story = StoryObj<typeof Serial>;

export const Default: Story = {
    args: {
        disabled: false,
        defaultValue: 'Object_001',
    },
};