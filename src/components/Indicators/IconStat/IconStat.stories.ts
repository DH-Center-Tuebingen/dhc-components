import type { Meta, StoryObj } from '@storybook/vue3';

import IconStat from './IconStat.vue';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';

const meta: Meta<typeof IconStat> = {
    component: IconStat,
};

export default meta;

type Story = StoryObj<typeof IconStat>;

export const Default: Story = {
    args: {
        icon: faThumbsUp,
        text: '100K',
    },
    render: (args: any) => ({
        components: { IconStat },
        setup() {
            return { args };
        },
        template: '<IconStat v-bind="args" />',
    }),
};

export const WithColor: Story = {
    args: {
        icon: faThumbsUp,
        text: '250',
        color: 'primary',
    },
    render: (args: any) => ({
        components: { IconStat },
        setup() {
            
            const likes = ref(10);
            const incrementLikes = () => {
                console.log('IconStat clicked');
                likes.value++;
            };
            return { args, likes, incrementLikes };
        },
        template: '<IconStat v-bind="args" :action="incrementLikes" :text="likes" />',
    }),
};