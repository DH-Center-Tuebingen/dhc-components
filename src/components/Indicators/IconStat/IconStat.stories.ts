import type { Meta, StoryObj } from '@storybook/vue3';

import IconStat from './IconStat.vue';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof IconStat> = {
  component: IconStat,
};

export default meta;

type Story = StoryObj<typeof IconStat>;

export const Default: Story = {
  args: {
    icon: faThumbsUp,
    data: '100K'
  },
  render: (args : any) => ({
    components: { IconStat },
    setup() {
        return { args };
    },
    template: '<IconStat v-bind="args" />',
  }),
};