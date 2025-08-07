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

export const Stringfield: Story = {
    args: {
        disabled: false,
        defaultValue: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\nStet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\nAt vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        type: 'stringfield',
        debug: true,
    },
};

export const Url: Story = {
    args: {
        disabled: false,
        defaultValue: 'https://github.com/DH-Center-Tuebingen/Spacialist',
        type: 'url',
        debug: true,
    },
};

export const Iconclass: Story = {
    args: {
        disabled: false,
        defaultValue: '71H136',
        type: 'iconclass',
        metadata: {
            language: 'fr',
        },
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

export const Dimension: Story = {
    args: {
        disabled: false,
        defaultValue: {
            B: 1,
            H: 2,
            T: 3,
            unit: 'm'
        },
        type: 'dimension',
        name: 'DimensionAttribute',
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

export const List: Story = {
    args: {
        disabled: false,
        defaultValue: ['A', 'B', 'C'],
        type: 'list',
        name: 'ListAttribute',
        debug: true,
    },
};

export const Rism: Story = {
    args: {
        disabled: false,
        defaultValue: '653004410',
        type: 'rism',
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