import type { Meta, StoryObj } from '@storybook/vue3';

import Attribute from './Attribute.vue';
import { AttributeProps } from './definitions';
import { SiUnitProps } from '../SiUnit/definitions';
import { BooleanProps } from '../Boolean/definitions';

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

export const Boolean: StoryObj<BooleanProps | AttributeProps> = {
    args: {
        disabled: false,
        defaultValue: true,
        type: 'boolean',
        name: 'BooleanAttribute',
        showText: true,
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
        defaultValue: '2025-03-10',
        type: 'date',
        name: 'DateAttribute',
        debug: true,
    },
};

export const Date_Range: Story = {
    args: {
        disabled: false,
        defaultValue: ['2025-03-10', '2025-04-01'],
        type: 'daterange',
        name: 'DateRangeAttribute',
        debug: true,
    },
};

export const Si_Unit: StoryObj<SiUnitProps | AttributeProps> = {
    args: {
        disabled: false,
        defaultValue: {
            value: 10,
            unit: 'pascal'
        },
        type: 'si-unit',
        metadata: {
            si_baseunit: 'pressure',
        },
        name: 'SiUnitAttribute',
        debug: true,
    },
};