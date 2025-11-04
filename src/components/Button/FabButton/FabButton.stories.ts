import type { Meta, StoryObj } from '@storybook/vue3';

import FabButton from './FabButton.vue';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof FabButton> = {
    component: FabButton,
};

export default meta;

type Story = StoryObj<typeof FabButton>;

export const Default: Story = {
    args: {
        icon: faPlus,
    },
    render: (args: any) => ({
        components: { FabButton },
        setup() {
            return { args };
        },
        template: '<FabButton v-bind="args" />',
    }),
};

export const Sizes: Story = {
    args: {
        icon: faPlus,
    },
    render: (args: any) => ({
        components: { FabButton },
        setup() {
            return { args };
        },
        template: `
        <div class="d-flex gap-3 align-items-center">
            <FabButton v-bind="args" size="sm" color="primary" />
            <FabButton v-bind="args" size="md" color="secondary" />
            <FabButton v-bind="args" size="lg" color="warning" />
            <FabButton v-bind="args" size="xl" color="danger" />
        </div>`,
    }),
};