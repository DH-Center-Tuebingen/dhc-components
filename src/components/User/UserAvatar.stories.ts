import type { Meta, StoryObj } from '@storybook/vue3';

import UserAvatar from './UserAvatar.vue';
import { Jane, UserList } from '@/mock/user';

const meta: Meta<typeof UserAvatar> = {
  component: UserAvatar,
  argTypes: {
    user: {
      options: UserList.map((user) => user.name),
      mapping: UserList.reduce((acc, user) => {
        acc[user.name] = user;
        return acc;
      }, {} as Record<string, any>),
      control: { type: 'select' },
    }
  }
};

export default meta;

type Story = StoryObj<typeof UserAvatar>;

export const Default: Story = {
  args: {
    // Add props here
    user: Jane,
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
    user: Jane,
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