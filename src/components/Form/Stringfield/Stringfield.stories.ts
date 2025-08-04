import type { Meta, StoryObj } from '@storybook/vue3';

import Stringfield from './Stringfield.vue';

const meta: Meta<typeof Stringfield> = {
  component: Stringfield,
};

export default meta;

type Story = StoryObj<typeof Stringfield>;

export const Default: Story = {
    args: {
        disabled: false,
        defaultValue: 'Hello World!',
    },
};