import type { Meta, StoryObj } from '@storybook/vue3';

import List from './List.vue';
import { faCircleUser, faSliders } from '@fortawesome/free-solid-svg-icons';

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

export const WithIcons: Story = {
    args: {
        withIcons: true, // Set to true to show icons
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

export const Loading: Story = {
    args: {
        withIcons: true, // Set to true to show icons
        // Add props here
        items: [
            {
                name: 'Profile',
                icon: faCircleUser,
                action: async () => {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                },
            },
            {
                name: 'Settings',
                icon: faSliders,
                action: async () => {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                },
            },
            {
                name: 'Upload',
                action: async () => {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                },
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

export const LoadingDisableAll: Story = {
    args: {
        disableAll: true, // Set to true to disable the entire list
        withIcons: true, // Set to true to show icons
        // Add props here
        items: [
            {
                name: 'Profile',
                icon: faCircleUser,
                action: async () => {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                },
            },
            {
                name: 'Settings',
                icon: faSliders,
                action: async () => {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                },
            },
            {
                name: 'Upload',
                action: async () => {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                },
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

