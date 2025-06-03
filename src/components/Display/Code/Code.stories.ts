import type { Meta, StoryObj } from '@storybook/vue3';

import Code from './Code.vue';

const meta: Meta<typeof Code> = {
    component: Code,
};

export default meta;

type Story = StoryObj<typeof Code>;

const exampleCode = `/**
 * Sorting an array by 'Bubbling' the largest element to the end of the array
 * 
 * @param arr 
 * @returns 
 */
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

/**
 * Sorting an array by selecting the smallest element and placing it at the beginning
 * 
 * @param arr 
 * @returns 
 */
function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        const temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
    return arr;
}

/**
 * Sorts an arry by utilizing the divide and conquer strategy
 * 
 * @param arr 
 * @returns 
 */
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat(pivot, quickSort(right));
}`

export const Default: Story = {
    args: {
        value: exampleCode,
    },
    render: (args: any) => ({
        components: { Code },
        setup() {
            return { args };
        },
        template: '<Code v-bind="args" />',
    }),
};

export const WithLanguage: Story = {
    args: {
        value: exampleCode,
        language: 'typescript',
    },
    render: (args: any) => ({
        components: { Code },
        setup() {
            return { args };
        },
        template: '<Code v-bind="args" />',
    }),
};

export const Overflow: Story = {
    args: {
        value: exampleCode,
        language: 'typescript',
    },
    render: (args: any) => ({
        components: { Code },
        setup() {
            return { args };
        },
        template: '<Code v-bind="args" style="height:250px" />',
    }),
};