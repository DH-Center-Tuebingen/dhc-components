import type { Meta, StoryObj } from '@storybook/vue3';

import MobileIconBar from './MobileIconBar.vue';

const meta: Meta<typeof MobileIconBar> = {
    component: MobileIconBar,
};

export default meta;

type Story = StoryObj<typeof MobileIconBar>;

export const Default: Story = {
    parameters: {
        viewport: { value: 'mobile1'},
    },
    args: {
        // Add props here
    },
    render: (args: any) => ({
        components: { MobileIconBar },
        setup() {
            return { args };
        },
        template: '<MobileIconBar v-bind="args">This is the content!</MobileIconBar>',
    }),
};