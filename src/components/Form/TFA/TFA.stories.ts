import type { Meta, StoryObj } from '@storybook/vue3';

import TFA from './TFA.vue';

const meta: Meta<typeof TFA> = {
  component: TFA,
};

export default meta;

type Story = StoryObj<typeof TFA>;

export const Default: Story = {
  args: {
  },
  render: (args : any) => ({
    components: { TFA },
    setup() {
        return { args };
    },
    template: '<TFA v-bind="args" />',
  }),
};