import type { Meta, StoryObj } from '@storybook/vue3';

import RangeSlider from './RangeSlider.vue';
import { ref } from 'vue';

const meta: Meta<typeof RangeSlider> = {
    component: RangeSlider,
    parameters: {
        docs: {
            description: {
                component: `A range slider component that allows users to select a range of values by dragging two handles along a track.

There are several hotkeys supported. Whild dragging you may adjust the snap with SHIFT, CTRL and ALT. The design idea is that SHIFT (very coarse), CTRL (acurate) and ALT (detailed). 
E.g. when having a scale from 0 to 100, SHIFT can be used to snap to all 10 steps, CTRL to snap to all integer values and with ALT you get every tenth.
                `,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
    args: {
    },
    render: (args: any) => ({
        components: { RangeSlider },
        setup() {
            const modelValue = ref<[number, number]>([20, 80]);
            return { args, modelValue };
        },
        template: '<RangeSlider v-bind="args" v-model="modelValue" />',
    }),
};

export const Integer: Story = {
    parameters: {
        docs: {
            description: {
                story: 'To set the slider to only use integer values set the **step** parameter to 1.',
            },
        },
    },
    args: {
        step: 1,
    },
    render: (args: any) => ({
        components: { RangeSlider },
        setup() {
            const modelValue = ref<[number, number]>([20, 80]);
            return { args, modelValue };
        },
        template: '<RangeSlider v-bind="args" v-model="modelValue" />',
    }),
};

export const SnapFive: Story = {
    args: {
        step: 5,
        min: -13,
        max: 13,
    },
    render: (args: any) => ({
        components: { RangeSlider },
        setup() {
            const modelValue = ref<[number, number]>([-5, 5]);
            return { args, modelValue };
        },
        template: '<RangeSlider v-bind="args" v-model="modelValue" style="max-width:256px;margin:auto;" />',
    }),
};

export const SnapFiveEnforceMinMax: Story = {
    parameters: {
        docs: {
            description: {
                story: 'In an edge case where min and/or max value of an slider do not match the snap step, then you may want to enforce the slider to use the min or max value. This can be done by setting the **enforceMinMax** flag.',
            },
        },
    },
    args: {
        step: 5,
        min: -13,
        max: 13,
        enforceMinMax: true,
    },
    render: (args: any) => ({
        components: { RangeSlider },
        setup() {
            const modelValue = ref<[number, number]>([-13, 10]);
            return { args, modelValue };
        },
        template: '<RangeSlider v-bind="args" v-model="modelValue" style="max-width:256px;margin:auto;" />',
    }),
};

export const AddRuler: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can add a set of multiple **Ruler** to the slider to better visualize existing values. Those **Ruler** may optional have a label property of type **RulerLabel**',
            },
        },
    },
    args: {
        step: 1,
        min:0,
        max: 100,
        rulers: [
            {
              step: 5,
              length: 3,  
            },
            {
                step: 10,
                length: 5,
                label: true
            }
        ]
    },
    render: (args: any) => ({
        components: { RangeSlider },
        setup() {
            const modelValue = ref<[number, number]>([20, 80]);
            return { args, modelValue };
        },
        template: '<RangeSlider v-bind="args" v-model="modelValue" />',
    }),
};

export const CustomizeRuler: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can add a set of multiple **Ruler** to the slider to better visualize existing values. Those **Ruler** may optional have a label property of type **RulerLabel**',
            },
        },
    },
    args: {
        step: 1,
        min:0,
        max: 100,
        rulers: [
            {
              step: 5,
              length: 3,  
            },
            {
                step: 10,
                width: 5,
                length: 5,
                color: '#0d6efd',
                label: {
                    size: 13,
                    padding:5,
                    family: '"Comic Sans MS", serif',
                    italic: true,
                    weight: 900,
                }
            }
        ]
    },
    render: (args: any) => ({
        components: { RangeSlider },
        setup() {
            const modelValue = ref<[number, number]>([20, 80]);
            return { args, modelValue };
        },
        template: '<RangeSlider v-bind="args" v-model="modelValue" />',
    }),
};