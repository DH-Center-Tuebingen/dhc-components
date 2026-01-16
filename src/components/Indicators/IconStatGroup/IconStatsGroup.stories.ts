import type { Meta, StoryObj } from '@storybook/vue3';

import IconStatsGroup from './IconStatsGroup.vue';
import { faBookmark, faRetweet, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof IconStatsGroup> = {
  component: IconStatsGroup,
};

export default meta;

type Story = StoryObj<typeof IconStatsGroup>;

export const Default: Story = {
  args: {
    value: [
        { icon: faThumbsUp, text: '100', color: 'success' },
        { icon: faThumbsDown, text: '25', color : 'danger' },
        { icon: faRetweet, text: '10' },
        { icon: faBookmark, text: '5' },
    ]
  },
  render: (args : any) => ({
    components: { IconStatsGroup },
    setup() {
        return { args };
    },
    template: '<IconStatsGroup v-bind="args" />',
  }),
};