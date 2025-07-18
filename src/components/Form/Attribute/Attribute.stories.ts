import type { Meta, StoryObj } from '@storybook/vue3';

import Attribute from './Attribute.vue';

const meta: Meta<typeof Attribute> = {
  component: Attribute,
};

export default meta;

type Story = StoryObj<typeof Attribute>;

export const String: Story = {
    args: {
        disabled: false,
        defaultValue: 'Hello DHC-Components!',
        type: 'string',
        debug: true,
    },
};

export const Integer: Story = {
    args: {
        disabled: false,
        defaultValue: 42,
        type: 'integer',
        name: 'IntegerAttribute',
        debug: true,
    },
};

export const Double: Story = {
    args: {
        disabled: false,
        defaultValue: 13.37,
        type: 'double',
        name: 'DoubleAttribute',
        debug: true,
    },
};

export const Date: Story = {
    args: {
        disabled: false,
        defaultValue: 13.37,
        type: 'date',
        name: 'DateAttribute',
        debug: true,
    },
};

export const Date_Range: Story = {
    args: {
        disabled: false,
        defaultValue: 13.37,
        type: 'daterange',
        name: 'DateRangeAttribute',
        debug: true,
    },
};