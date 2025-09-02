import type { Meta, StoryObj } from '@storybook/vue3';

import Timeperiod from './Timeperiod.vue';
import { ReducedThesaurusConcept } from 'src/types/Concept';

const meta: Meta<typeof Timeperiod> = {
  component: Timeperiod,
};

export default meta;

type Story = StoryObj<typeof Timeperiod>;

const testEpochs: Array<ReducedThesaurusConcept> = [
    {
        id: 1,
        label: 'Stone Age'
    },
    {
        id: 2,
        label: 'Iron Age'
    },
    {
        id: 3,
        label: 'Bronze Age'
    },
];

export const Default: Story = {
    args: {
        disabled: false,
        // defaultValue: 'Hello World!',
    },
};

export const Epoch: Story = {
    args: {
        disabled: false,
        mode: 'epoch',
        metadata: {
            epochs: testEpochs,
        },
        defaultValue: {
            start: 0,
            startLabel: 'BC',
            end: 100,
            endLabel: 'AD',
            epoch: 1
        }
    },
};