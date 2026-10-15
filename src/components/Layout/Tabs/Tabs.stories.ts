import { expect } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';

import Tabs from './Tabs.vue';

const tabContent = {
    home: '<h3>Home</h3><p>Home content</p>',
    about: '<h3>About</h3> <ul><li>Storybook</li><li>Component: Tabs</li></ul>',
    contact: '<h3>Contact</h3><p>Contact content</p>',
    long: '<h3>Very Long Tab Name That Will Definitly Cause A Line Break</h3><p>... for visualizing the different width properties.</p>'
};

function createSlotsFromObject(obj: { [key: string]: string }) {
    return Object.keys(obj).map((key) => (
        `<template v-slot:${key} :key="${key}">
        ${obj[key]}
        </div>
    </template>`
    )).join('\n\n');
}

const meta: Meta<typeof Tabs> = {
    component: Tabs,
    render: (args) => ({
        components: { Tabs },
        setup() {
            return { args };
        },
        template: `
        <Tabs v-bind="args">
            ${createSlotsFromObject(tabContent)}
        </Tabs>
        `
    }),
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const tabs = [
    {key: 'home', label: 'Home'},
    {key: 'about', label: 'About'},
    {key: 'contact', label: 'Contact'},
    {key: 'long', label: 'Very Long Tab Name That Will Definitly Cause A Line Break'}
]

export const Dynamic: Story = {
    args: {
        tabs,
    },
    play: async ({ canvas }) => {
        const home = canvas.getByText(/home/i, { selector: 'li>a' });
        await home.click();

        const homeContent = canvas.getByText(/Home content/i);
        const aboutContent = canvas.getByText(/Storybook/i);
        const contactContent = canvas.getByText(/Contact content/i);

        expect(homeContent).toBeVisible();
        expect(aboutContent).not.toBeVisible();
        expect(contactContent).not.toBeVisible();

        const about = canvas.getByText(/about/i, { selector: 'li>a' });
        await about.click();

        expect(homeContent).not.toBeVisible();
        expect(aboutContent).toBeVisible();
        expect(contactContent).not.toBeVisible();

        const contact = canvas.getByText(/contact/i, { selector: 'li>a' });
        await contact.click();

        expect(homeContent).not.toBeVisible();
        expect(aboutContent).not.toBeVisible();
        expect(contactContent).toBeVisible();
    }
};

export const Pills: Story = {
    args: {
        tabs,
        style: 'pills'
    },
}

export const Underline: Story = {
    args: {
        tabs,
        style: 'underline'
    },
}

export const Fill: Story = {
    args: {
        tabs,
        width: 'fill'
    },
}

export const FillEvenly: Story = {
    args: {
        tabs,
        width: 'fill-evenly'
    },
}