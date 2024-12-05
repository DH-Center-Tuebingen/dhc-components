import type { Meta, StoryObj } from '@storybook/vue3';

import Container from './Container.vue';

const meta: Meta<typeof Container> = {
  component: Container,
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    // Add props here
  },
  render: (args : any) => ({
    components: { Container },
    setup() {
        return { args };
    },
    template: '<Container v-bind="args">Container content</Container>',
  }),
};