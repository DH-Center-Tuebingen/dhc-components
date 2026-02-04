import type { Meta, StoryObj } from '@storybook/vue3';

import Badge from './Badge.vue';

const meta: Meta<typeof Badge> = {
    component: Badge,
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        content: 'Badge',
    },
};

export const DarkPill: Story = {
    args: {
        content: 'Badge',
        style: 'pill',
        color: 'dark',
    },
};

export const WarningUnrounded: Story = {
    args: {
        content: 'Badge',
        style: 'unrounded',
        color: 'warning',
    },
};

export const DangerUnroundedOutline: Story = {
    args: {
        content: 'Badge',
        style: 'unrounded',
        color: 'danger',
        outline: true,
    },
};