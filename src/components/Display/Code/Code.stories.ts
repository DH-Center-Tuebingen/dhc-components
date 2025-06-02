import type { Meta, StoryObj } from '@storybook/vue3';

import Code from './Code.vue';

const meta: Meta<typeof Code> = {
    component: Code,
};

export default meta;

type Story = StoryObj<typeof Code>;

export const Default: Story = {
    args: {
        value: `function exampleCode() {
    try {
        for(let i = 0; i < 10; i++) {
            console.log("This is line " + (i + 1));
        }

        let isRunning = true;
        let count = 0;
        while(isRunning) {
            console.log("Count is " + count);
            count++;
            if(count >= 5) {
                isRunning = false;
            }
        }

        return 'Example code executed successfully!';
    }catch(e) {
        return 'An error occurred:' + e;
    }
}`
    },
    render: (args: any) => ({
        components: { Code },
        setup() {
            return { args };
        },
        template: '<Code v-bind="args" />',
    }),
};