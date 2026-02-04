import type { Meta, StoryObj } from '@storybook/vue3';

import EmojiPicker from './EmojiPicker.vue';

const meta: Meta<typeof EmojiPicker> = {
  component: EmojiPicker,
};

export default meta;

type Story = StoryObj<typeof EmojiPicker>;

export const Default: Story = {
  args: {
      position: 'end',
  }
};

export const WithLabel: Story = {
  args: {
      label: 'Open EmojiPicker',
      position: 'end',
  }
};

export const RenderEnd: Story = {
    render: () => ({
        components: { EmojiPicker },
        template: `<EmojiPicker class="text-end" label=":tada:" position="start" />`,
    }),
};
