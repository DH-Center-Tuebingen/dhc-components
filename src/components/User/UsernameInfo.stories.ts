import type { Meta, StoryObj } from '@storybook/vue3';

import UsernameInfo from './UsernameInfo.vue';
import { Jane, UserList } from '@/mock/user';

const meta: Meta<typeof UsernameInfo> = {
  component: UsernameInfo,
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

type Story = StoryObj<typeof UsernameInfo>;

export const Default: Story = {
  args: {
    // Add props here
    user: Jane,
  },
  render: (args: any) => ({
    components: { UsernameInfo },
    setup() {
      return { args }
    },
    template: '<UsernameInfo v-bind="args" />',
  }),
};

export const WithImage: Story = {
  args: {
    // Add props here
    user: Jane,
  },
  render: (args: any) => ({
    components: { UsernameInfo },
    setup() {
      return { args }
    },
    template: '<UsernameInfo v-bind="args" />',
  }),
};