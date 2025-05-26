import type { Meta, StoryObj } from '@storybook/vue3';

import Tree from './Tree.vue';
import { createVNode, defineComponent, ref } from 'vue';

const defaultTree = [
    {
        id: 'root one',
        name: 'Root Node One',
        children: [
            {
                id: 'child1',
                name: 'Child 1',
                children: [
                    {
                        id: 'grandchild1',
                        name: 'Grandchild 1',
                        children: []
                    },
                    {
                        id: 'grandchild2',
                        name: 'Grandchild 2',
                        children: [],
                    }
                ]
            },
            {
                id: 'child2',
                name: 'Child 2',
                children: []
            },
            {
                id: 'child3',
                name: 'Child 3',
                children: [
                    {
                        id: 'grandchild3',
                        name: 'Grandchild 3',
                        children: []
                    }
                ]
            }
        ]
    },
]


const meta: Meta<typeof Tree> = {
    component: Tree,
};

export default meta;

type Story = StoryObj<typeof Tree>;

export const Default: Story = {
    args: {
        nodes: defaultTree,
    },
    render: (args: any) => ({
        components: { Tree },
        setup() {
            return { args };
        },
        template: '<Tree v-bind="args" />',
    }),
};

const CustomNode = createVNode({
    name: 'CustomNode',
    props: ['node'],
    template: '<div class="custom-node" style="background-color: red;">{{ node.name }} ({{node.id}})</div>'
})

export const WithCustomNode: Story = {
    args: {
        nodes: defaultTree,
        nodeComponent: CustomNode,
    },
    render: (args: any) => ({
        components: { Tree },
        setup() {
            return { args };
        },
        template: '<Tree v-bind="args" />',
    }),
};

const CustomControl = defineComponent({
    name: 'CustomControl',
    props: ['node', 'modelValue'],
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        
        const toggle = () => {
            emit('update:modelValue', !props.modelValue);
        };
        return { toggle };
    },
    template: `
        <div class="custom-control" @click="toggle" style="color: DeepSkyBlue; user-select: none;">
            <span v-if="modelValue">▼</span>
            <span v-else>▶</span>
        </div>
    `
})

export const WithCustomControl: Story = {
    args: {
        nodes: defaultTree,
        controlComponent: CustomControl,
    },
    render: (args: any) => ({
        components: { Tree },
        setup() {
            return { args };
        },
        template: '<Tree v-bind="args" />',
    }),
};