import type { Meta, StoryObj } from '@storybook/vue3';

import Richtext from './Richtext.vue';

const meta: Meta<typeof Richtext> = {
  component: Richtext,
};

export default meta;

type Story = StoryObj<typeof Richtext>;

export const Default: Story = {
    args: {
        disabled: false,
        // defaultValue: 'Hello World!',
    },
};