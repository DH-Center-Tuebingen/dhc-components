import type { Meta, StoryObj } from '@storybook/vue3';

import IconInputSlider from './IconInputSlider.vue';
import { ref } from 'vue';

const meta: Meta<typeof IconInputSlider> = {
  component: IconInputSlider,
};

export default meta;

type Story = StoryObj<typeof IconInputSlider>;

export const Default: Story = {
  args: {
    // Add props here
  },
  render: (args : any) => ({
    components: { IconInputSlider },
    setup() {
        const model = ref(0.5)
        
        return { args, model };
    },
    template: '<IconInputSlider v-bind="args" v-model="model" />',
  }),
};