import type { Meta, StoryObj } from '@storybook/vue3';

import IconStatList from './IconStatList.vue';
import { faBookmark, faRetweet, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof IconStatList> = {
  component: IconStatList,
};

export default meta;

type Story = StoryObj<typeof IconStatList>;

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
    components: { IconStatList },
    setup() {
        return { args };
    },
    template: '<IconStatList v-bind="args" />',
  }),
};