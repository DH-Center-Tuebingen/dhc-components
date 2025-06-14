import { setup, type Meta, type StoryObj } from '@storybook/vue3';

import { ref, computed, ComputedRef } from 'vue';

import Toolbar, { Tool } from './Toolbar.vue';
import {
    faArrowLeft,
    faArrowRight,
    faBan,
    faMagnifyingGlassMinus,
    faMagnifyingGlassPlus,
    faPlus
} from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Toolbar> = {
    component: Toolbar,
};

export default meta;

type Story = StoryObj<typeof Toolbar>;

const toolGroups: Tool[][] = [
    [
        {
            name: 'Add',
            title: 'Add',
            icon: faPlus,
            action: () => {
                console.log('Add action triggered');
            }
        }
    ], [
        {
            name: 'Left',
            title: 'Left',
            icon: faArrowLeft,
            action: () => {
                console.log('Left action triggered');
            }
        }, {
            name: 'Right',
            title: 'Right',
            icon: faArrowRight,
            action: () => {
                console.log('Right action triggered');
            }
        }
    ], [
        {
            name: 'Zoom In',
            title: 'Zoom In',
            icon: faMagnifyingGlassPlus,
            action: () => {
                console.log('Zoom In action triggered');
            }
        }, {
            name: 'Zoom Out',
            title: 'Zoom Out',
            icon: faMagnifyingGlassMinus,
            action: () => {
                console.log('Zoom Out action triggered');
            }
        }, {
            name: 'Restricted',
            disabled: true,
            icon: faBan,
            title: `This won't show as it is disabled`,
            action: () => {
                console.error('This action should not be triggered');
            }
        }
    ]
]

export const Default: Story = {
    args: {
        toolGroups: toolGroups,
    },
};



export const Interactive: Story = {
    render: (args: any) => ({
        components: { Toolbar },
        setup() {

            const disabled = ref(false);

            const interactiveToolGroups: ComputedRef<Tool[][]> = computed(_ =>[
                [
                    {
                        name: 'Add',
                        title: 'Add',
                        icon: !disabled.value ? faPlus : faBan,
                        disabled: disabled.value,
                        action: () => {
                            console.log('Add action triggered');
                        }
                    }
                ],
            ])


            return {
                toolGroups: interactiveToolGroups,
                disabled: disabled
            };
        },
        template: `
        <Toolbar :toolGroups="toolGroups" :disabled="disabled"/> 
        <button class="btn btn-primary btn-sm mt-2" @click="disabled = !disabled">Toggle Disabled: {{disabled ? 'disabled' : 'enabled'}}</button>
        `,
    }),
};