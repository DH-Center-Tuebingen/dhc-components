import type { Meta, StoryObj } from '@storybook/vue3';

import Toolbar, { Tool } from './Toolbar.vue';
import { faArrowLeft, faArrowRight, faMagnifyingGlassMinus, faMagnifyingGlassPlus, faPlus } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Toolbar> = {
  component: Toolbar,
};

export default meta;

type Story = StoryObj<typeof Toolbar>;

const toolGroups: Tool[][] = [
    [
        {
            name: 'Add',
            icon: faPlus,
            action: () => {
                console.log('Add action triggered');
            }
        }
    ], [
        {
            name: 'Left',
            icon: faArrowLeft,
            action: () => {
                console.log('Left action triggered');
            }
        }, {
            name: 'Right',
            icon: faArrowRight,
            action: () => {
                console.log('Right action triggered');
            }
        }
    ],[
        {
            name: 'Zoom In',
            icon: faMagnifyingGlassPlus,
            action: () => {
                console.log('Zoom In action triggered');
            }
        }, {
            name: 'Zoom Out',
            icon: faMagnifyingGlassMinus,
            action: () => {
                console.log('Zoom Out action triggered');
            }
        }
    ]
]

console.log('Tool groups:', toolGroups);

export const Default: Story = {
  args: {
    toolGroups: toolGroups,
  },
};