import type { Meta, StoryObj } from '@storybook/vue3';

import IconButton from './IconToggle.vue';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {
    activeIcon: faEye,
    inactiveIcon: faEyeSlash,
  },
  render: (args) => ({
    components: { IconButton },
    setup() {
      const value = ref(false);
      return { args, value };
    },
    template: '<IconButton v-bind="args" v-model="value"  />',
  }),
};
