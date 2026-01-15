import type { Meta, StoryObj } from '@storybook/vue3';

import Avatar from './Avatar.vue';

const meta: Meta<typeof Avatar> = {
    component: Avatar,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
    args: {
        name: 'John Doe',
        max: 2,
    },
};

export const Square: Story = {
    args: {
        name: 'John Doe',
        rounded: false,
    },
};

export const Small: Story = {
    args: {
        name: 'John Doe',
        size: 16,
    },
};

export const Medium: Story = {
    args: {
        name: 'John Doe',
        size: 32,
    },
};

export const XLarge: Story = {
    args: {
        name: 'John Doe',
        size: 128,
    },
};

export const WithSkippedMiddleName: Story = {
    args: {
        name: 'John van Doe',
        max: 2,
    },
};

export const WithMiddleName: Story = {
    args: {
        name: 'John van Doe',
        max: 3,
        shadow: true,
    },
};