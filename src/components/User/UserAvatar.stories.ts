import type { Meta, StoryObj } from '@storybook/vue3';

import UserAvatar from './UserAvatar.vue';

const meta: Meta<typeof UserAvatar> = {
  component: UserAvatar,
};

export default meta;

type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {
  args: {
    // Add props here
    user: {
      name: 'John Doe',
      nickname: 'johnny',
      avatar: null
    },
    size: 30,
  },
  render: (args: any) => ({
    components: { UserAvatar },
    setup() {
      return { args }
    },
    template: '<UserAvatar v-bind="args" />',
  }),
};

export const WithImage: Story = {
  args: {
    // Add props here
    user: {
      name: 'Jane Doe',
      nickname: 'jeannette',
      avatar: true,
      avatar_url: '/img/users/user-1.svg'
    },
    size: 30,
  },
  render: (args: any) => ({
    components: { UserAvatar },
    setup() {
      return { args }
    },
    template: '<UserAvatar v-bind="args" />',
  }),
};