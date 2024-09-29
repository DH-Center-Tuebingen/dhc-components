import type { Meta, StoryObj } from '@storybook/vue3';

import UserInfo from './UserInfo.vue';
import { Jane, UserList } from '@/mock/user';

const meta: Meta<typeof UserInfo> = {
  component: UserInfo,
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

type Story = StoryObj<typeof UserInfo>;

export const Default: Story = {
  args: {
    // Add props here
    user: Jane,
    size: 30,
  },
  render: (args: any) => ({
    components: { UserInfo },
    setup() {
      return { args }
    },
    template: '<UserInfo v-bind="args" />',
  }),
};

export const WithImage: Story = {
  args: {
    // Add props here
    user: Jane,
    size: 30,
  },
  render: (args: any) => ({
    components: { UserInfo },
    setup() {
      return { args }
    },
    template: '<UserInfo v-bind="args" />',
  }),
};