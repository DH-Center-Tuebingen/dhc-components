import type { Meta, StoryObj } from '@storybook/vue3';

import FileDrop from './FileDrop.vue';
import { ref } from 'vue';

const wrapTemplate = (template: string) => `<div style="height: 200px;">${template}</div>`;

const meta: Meta<typeof FileDrop> = {
  component: FileDrop,
  parameters: {
    layout: 'fullscreen'
  }
};

export default meta;

type Story = StoryObj<typeof FileDrop>;

export const Default: Story = {
  args: {
    text: 'Drop your files here ...',
  },
  render: (args : any) => ({
    components: { FileDrop },
    setup() {
        return { args };
    },
    template: wrapTemplate(`<FileDrop v-bind="args" />`),
  }),
};

export const Animation: Story = {
  args: {
    text: 'Drop your files here ...',
  },
  render: (args : any) => ({
    components: { FileDrop },
    setup() {
        const active = ref(true);
        setInterval(() => {
            console.log('toggle');
            active.value = !active.value;
        }, 2000);
        
        return { args, active };
    },
    template: wrapTemplate(`<FileDrop v-bind="args" :active="active" />`),
  }),
};