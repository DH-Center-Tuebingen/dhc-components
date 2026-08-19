import type { Meta, StoryObj } from '@storybook/vue3';

import Avatar from './Avatar.vue';

import image from "_/.storybook/assets/Dummy.png"
console.log(image)

const meta: Meta<typeof Avatar> = {
    component: Avatar,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
    args: {
        name: 'John Doe',
        max: 2,
        image,
    },
};

export const Square: Story = {
    args: {
        name: 'John Doe',
        rounded: false,
        image,
    },
};

export const Small: Story = {
    args: {
        name: 'John Doe',
        size: 16,
    },
};

export const Medium: Story = {
    args: {
        name: 'John Doe',
        size: 32,
    },
};

export const XLarge: Story = {
    args: {
        name: 'John Doe',
        size: 128,
    },
};

export const WithSkippedMiddleName: Story = {
    args: {
        name: 'John van Doe',
        max: 2,
    },
};

export const WithMiddleName: Story = {
    args: {
        name: 'John van Doe',
        max: 3,
        shadow: true,
    },
};

export const FallbackIfImageNotFound: Story = {
    args: {
        name: 'John Doe',
        max: 2,
        image: "DoesNotExist.jpg",
    },
};