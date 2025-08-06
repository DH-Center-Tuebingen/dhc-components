import type { Meta, StoryObj } from '@storybook/vue3';

import Url from './Url.vue';

const meta: Meta<typeof Url> = {
  component: Url,
};

export default meta;

type Story = StoryObj<typeof Url>;

export const Default: Story = {
    args: {
        disabled: false,
        defaultValue: 'https://github.com/DH-Center-Tuebingen/Spacialist',
    },
};