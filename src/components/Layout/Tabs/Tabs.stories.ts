import { expect } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';

import Tabs from './Tabs.vue';

const tabContent = {
  Home: '<h1>Home</h1><p>Home content</p>',
  About: '<h1>About</h1> <ul><li>Storybook</li><li>Component: Tabs</li></ul>',
  Contact: '<h1>Contact</h1><p>Contact content</p>',
}

function createSlotsFromObject(obj: { [key: string]: string }) {
  return Object.keys(obj).map((key) => (
    `<template v-slot:${key} :key="${key}">
    ${obj[key]}
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
      <Tabs :tabs="args.tabs">
          ${createSlotsFromObject(tabContent)}
      </Tabs>
    `
  }),
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Dynamic: Story = {
  args: {
    tabs: ['Home', 'About', 'Contact'],
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
