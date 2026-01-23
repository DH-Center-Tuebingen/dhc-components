import type { Meta, StoryObj } from '@storybook/vue3';

import LoadingButton from './LoadingButton.vue';

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
    },
};

export const Loading: Story = {
    args: {
        loading: true,
        default: 'Click me',
        color: 'primary',
    },
};

export const Outline: Story = {
    args: {
        loading: false,
        default: 'Click me',
        color: 'dark',
        outlined: true
    },
};

export const OutlineLoading: Story = {
    args: {
        loading: true,
        default: 'Click me',
        color: 'dark',
        outlined: true
    },
};
