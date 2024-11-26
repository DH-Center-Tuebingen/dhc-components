
import type { Meta, StoryObj } from '@storybook/vue3';

import AutoResizeTextArea from './AutoResizeTextArea.vue';

const meta: Meta<typeof AutoResizeTextArea> = {
    component: AutoResizeTextArea,
};

export default meta;

type Story = StoryObj<typeof AutoResizeTextArea>;

export const Default: Story = {
    args: {
    },
    render: (args) => ({
        components: { AutoResizeTextArea },
        setup() {
            return { args };
        },
        template: '<AutoResizeTextArea v-bind="args" />',
    }),
};