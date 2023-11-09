import type { Meta, StoryObj } from '@storybook/vue3';

import Toast from './Toast.vue';

const meta: Meta<typeof Toast> = {
    component: Toast,
    argTypes: {
        verticalPosition: {
            options: ['top', 'middle', 'bottom'],
            control: { type: 'select' }
        },
        horizontalPosition: {
            options: ['left', 'center', 'right'],
            control: { type: 'select' }
        },
    }
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = {};

export const PopupDelay: Story = {
    args: {
        popupDelay: 1000
    }
};
