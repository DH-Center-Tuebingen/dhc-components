import type { Meta, StoryObj } from '@storybook/vue3';

import Menu from './Menu.vue';
import { faCircleUser, faFloppyDisk, faLifeRing, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Menu> = {
    component: Menu,
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {
    args: {
        menu: [{
            name: 'Account',
            items: [
                {
                    name: 'Profile',
                    icon: faCircleUser,
                },
                {
                    name: 'Settings',
                },
                {
                    name: 'Logout',
                }
            ]
        }, {
            name: 'Actions',
            items: [

                {
                    name: 'Save',
                    icon: faFloppyDisk,
                },
                {
                    name: 'Delete',
                    icon: faTrashAlt,
                }
            ]
        }, {
            name: 'Help',
            items: [

                {
                    name: 'FAQ',
                },
                {
                    name: 'Contact',
                }, {
                    name: 'Support',
                    icon: faLifeRing,
                }
            ]
        }]
    },
    render: (args: any) => ({
        components: { Menu },
        setup() {
            return { args };
        },
        template: '<Menu v-bind="args" />',
    }),
};