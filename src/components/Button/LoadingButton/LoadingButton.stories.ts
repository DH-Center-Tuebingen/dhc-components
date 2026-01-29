import type { Meta, StoryObj } from '@storybook/vue3';

import LoadingButton from './LoadingButton.vue';

const waitFor = async (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

const meta: Meta<typeof LoadingButton> = {
    component: LoadingButton,
    parameters: {
        slots: {
            default: {
                description: 'Default slot',
                template: `<span>{{ args.default }}</span>`,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof LoadingButton>;

export const Default: Story = {
    args: {
        loading: false,
        default: 'Click me',
        color: 'primary',
        action: waitFor,
    },
};

export const Loading: Story = {
    args: {
        loading: true,
        default: 'Click me',
        color: 'primary',
        action: waitFor,
    },
};

export const Outline: Story = {
    args: {
        loading: false,
        default: 'Click me',
        color: 'dark',
        outlined: true,
        action: waitFor,
    },
};

export const OutlineLoading: Story = {
    args: {
        loading: true,
        default: 'Click me',
        color: 'dark',
        outlined: true,
        action: waitFor,
    },
};
