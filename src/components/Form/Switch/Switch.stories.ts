import type { Meta, StoryObj } from '@storybook/vue3';

import Switch from './Switch.vue';

const meta: Meta<typeof Switch> = {
    component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
    args: {
        uid: 'default',
    }
};

export const Disabled: Story = {
    args: {
        uid: 'disabled',
        disabled: true,
    }
}

export const Labeled: Story = {
    args: {
        uid: 'labeled_switch',
        modelValue: true,
    }, render: (args) => ({
        components: { Switch },
        setup() {
            return { args };
        },
        template: `<Switch v-bind="args">Label</Switch>`,
    }),
}
