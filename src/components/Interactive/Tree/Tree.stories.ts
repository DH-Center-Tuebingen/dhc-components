import type { Meta, StoryObj } from '@storybook/vue3';

import Tree from './Tree.vue';

const meta: Meta<typeof Tree> = {
  component: Tree,
};

export default meta;

type Story = StoryObj<typeof Tree>;

export const Default: Story = {
  args: {
    data: [
        {
            id: '1',
            name: 'Node 1',
        },
        {
            id: '2',
            name: 'Node 2',
            children: [
                {
                    id: '5',
                    name: 'Node 2.1',
                },
                {
                    id: '6',
                    name: 'Node 2.2',
                },
            ],
        },
        {
            id: '3',
            name: 'Node 3',
            children: [
                {
                    id: '7',
                    name: 'Node 3.1',
                    children:[
                        {
                            id: '10',
                            name: 'Node 3.1.1',
                        },
                        {
                            id: '11',
                            name: 'Node 3.1.2',
                        },
                    ]
                },
                {
                    id: '8',
                    name: 'Node 3.2',
                    children:[
                        {
                            id: '12',
                            name: 'Node 3.2.1',
                        },
                        {
                            id: '13',
                            name: 'Node 3.2.2',
                        },
                    ]
                },
                {
                    id: '9',
                    name: 'Node 3.3',
                },   
            ]
        },
        {
            id: '4',
            name: 'Node 4',
        },
    ]
  },
  render: (args : any) => ({
    components: { Tree },
    setup() {
        return { args };
    },
    template: '<Tree v-bind="args" />',
  }),
};