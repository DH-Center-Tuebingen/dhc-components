import type { Meta, StoryObj } from '@storybook/vue3';

import SlideControl from './SlideControl.vue';
import { ref } from 'vue';


const meta: Meta<typeof SlideControl> = {
    component: SlideControl,
};

export default meta;
type Story = StoryObj<typeof SlideControl>;

export const Default: Story = {
    render: () => ({
        components: { SlideControl },
        setup() {
            const modelValue = ref(30);
            return { modelValue };
        },
        template: `<SlideControl v-model="modelValue" />`,
    }),
};

export const Vertical: Story = {
    args: {
        vertical: true,
          step: 10,
    },
    render: (args) => ({
        components: { SlideControl },
        setup() {
            const modelValue = ref(30);
            return { args,modelValue };
        },
        template: `<SlideControl v-bind="args" v-model="modelValue" />`,
    }),
};
