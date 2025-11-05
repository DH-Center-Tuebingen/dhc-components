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
        { icon: faThumbsUp, data: ' 100'},
        { icon: faThumbsDown, data: ' 25' },
        { icon: faRetweet, data: ' 10' },
        { icon: faBookmark, data: ' 5' },
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