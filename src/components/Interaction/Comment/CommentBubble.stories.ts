import type { Meta, StoryObj } from '@storybook/vue3';

import CommentBubble from './CommentBubble.vue';

const meta: Meta<typeof CommentBubble> = {
  component: CommentBubble,
};

export default meta;

type Story = StoryObj<typeof CommentBubble>;

export const Default: Story = {
  render: () => ({
    components: { CommentBubble },
    template: '<CommentBubble />',
  }),
};