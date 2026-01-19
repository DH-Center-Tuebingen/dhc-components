import type { Meta, StoryObj } from '@storybook/vue3';

import Toast from './Toast.vue';

const meta: Meta<typeof Toast> = {
    component: Toast,
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
    args: {
    }
};

export const Simple: Story = {
    args: {
        simple: true,
    }
};

export const Persistent: Story = {
    args: {
        simple: false,
        autohide: false,
    }
};

export const SimplePersistent: Story = {
    args: {
        simple: true,
        autohide: false,
    }
};

export const WithChannel: Story = {
    args: {
        channel: 'success',
    }
};

export const WithIconWarning: Story = {
    args: {
        channel: 'warning',
        icon: true,
    }
};

export const WithIconDanger: Story = {
    args: {
        channel: 'danger',
        icon: true,
    }
};

export const HideTimeout: Story = {
    args: {
        channel: 'success',
        icon: true,
        hideTimeout: true,
    }
};