import type { Meta, StoryObj } from '@storybook/vue3';

import List from './List.vue';
import {  faCircleUser, faSliders } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof List> = {
    component: List,
};

export default meta;

type Story = StoryObj<typeof List>;

export const Default: Story = {
    args: {
        // Add props here
        items: [
            {
                name: 'Profile',
                icon: faCircleUser,
            },
            {
                name: 'Settings',
                icon: faSliders,
            },
            {
                name: 'Logout',
            }
        ]
    },
    render: (args: any) => ({
        components: { List },
        setup() {
            return { args };
        },
        template: '<List v-bind="args" />',
    }),
};