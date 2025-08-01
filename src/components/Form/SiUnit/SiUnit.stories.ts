import type { Meta, StoryObj } from '@storybook/vue3';

import SiUnit from './SiUnit.vue';

const meta: Meta<typeof SiUnit> = {
  component: SiUnit,
};

export default meta;

type Story = StoryObj<typeof SiUnit>;

export const Default: Story = {
    args: {
        metadata: {
            si_baseunit: 'area',
        },
    },
};

export const Area: Story = {
    args: {
        metadata: {
            si_baseunit: 'area',
        },
    },
};

export const Force: Story = {
    args: {
        metadata: {
            si_baseunit: 'force',
        },
    },
};

export const Length: Story = {
    args: {
        metadata: {
            si_baseunit: 'length',
        },
    },
};

export const Mass: Story = {
    args: {
        metadata: {
            si_baseunit: 'mass',
        },
    },
};

export const Pressure: Story = {
    args: {
        metadata: {
            si_baseunit: 'pressure',
        },
    },
};

export const Speed: Story = {
    args: {
        metadata: {
            si_baseunit: 'speed',
        },
    },
};

export const Temperature: Story = {
    args: {
        metadata: {
            si_baseunit: 'temperature',
        },
    },
};

export const Time: Story = {
    args: {
        metadata: {
            si_baseunit: 'time',
        },
    },
};

export const Volume: Story = {
    args: {
        metadata: {
            si_baseunit: 'volume',
        },
    },
};

export const VolumetricFlow: Story = {
    args: {
        metadata: {
            si_baseunit: 'volumetric_flow',
        },
    },
};