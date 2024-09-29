import type { Meta, StoryObj } from '@storybook/vue3';

import Modal from './Modal.vue';

const meta: Meta<typeof Modal> = {
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: { },
  render: (args: any) => ({
    components: { Modal },
    setup() {
      return { args }
    },
    template: '<Modal v-bind="args" />',
  }),
};
