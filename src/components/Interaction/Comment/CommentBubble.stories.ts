import type { Meta, StoryObj } from '@storybook/vue3';

import CommentBubble from './CommentBubble.vue';
import { update } from 'cypress/types/lodash';
import type { Comment } from 'src/types/Interaction';

const meta: Meta<typeof CommentBubble> = {
  component: CommentBubble,
};

export default meta;


const comment  :Comment = {
  id: 1,
  created_at: '2021-01-01',
  updated_at: '2021-01-02',
  deleted_at: null,
  content: 'Hello, World!',
  // user: {
  //   avatar: true,
  //   avatar_url: 'https://example.com/avatar.png',
  //   nickname: 'alice',
  //   name: 'Alice',
  //   email: ''
  // },
}


type Story = StoryObj<typeof CommentBubble>;

export const Default: Story = {
  render: () => ({
    components: { CommentBubble },
    template: '<CommentBubble />',
  }),
};