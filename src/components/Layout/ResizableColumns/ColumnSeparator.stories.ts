import type { Meta, StoryObj } from '@storybook/vue3';

import ColumnSeparator from './ColumnSeparator.vue';

const meta: Meta<typeof ColumnSeparator> = {
    component: ColumnSeparator,
};

export default meta;

type Story = StoryObj<typeof ColumnSeparator>;

const containerStyle = {
    position: 'relative',
    display: 'flex',
    ['justify-content']: 'center',
    height: '250px',
    padding: '20px',
    ['background-color']: 'var(--bs-body-color)'
}

const applyInlineStyles = (styles: any) => {
    return Object.keys(styles).reduce((acc, key) => {
        return `${acc}${key}:${styles[key]};`
    }, '')
}

console.log(applyInlineStyles(containerStyle))

export const Default: Story = {
    args: {
        // Add props here
    },
    render: (args: any) => ({
        components: { ColumnSeparator },
        setup() {
            return { args };
        },
        template: `<div style="${applyInlineStyles(containerStyle)}"><ColumnSeparator v-bind="args" /></div>`,
    }),
};