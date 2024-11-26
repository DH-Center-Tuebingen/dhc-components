import type { Meta, StoryObj } from '@storybook/vue3';

import IconButton from './IconButton.vue';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};

export default meta;


type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    icon: faPlus,
  },
  render: (args) => ({
    components: { IconButton },
    setup() {
      return { args };
    },
    template: '<IconButton v-bind="args" />',
  }),
};
