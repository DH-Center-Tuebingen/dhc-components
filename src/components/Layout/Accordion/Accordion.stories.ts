import { expect } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import { sleep } from '../../../../.storybook/utils';

import Accordion from './Accordion.vue';


const accordionDelay = 400;

const accordionContent = {
  Home: '<h1>Home</h1><p>Home content</p>',
  About: '<h1>About</h1> <ul><li>Storybook</li><li>Component: Accordion</li></ul>',
  Contact: '<h1>Contact</h1><p>Contact content</p>',
}

function createSlotsFromObject(obj: { [key: string]: string }) {
  return Object.keys(obj).map((key) => (
    `<template v-slot:${key} :key="${key}">
    ${obj[key]}
  </template>`
  )).join('\n\n');
}


const meta: Meta<typeof Accordion> = {
  component: Accordion,
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
      <Accordion :name="args.name" :titles="args.titles">
          ${createSlotsFromObject(accordionContent)}
      </Accordion>
    `
  }),
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Dynamic: Story = {
  args: {
    name: 'dynamic-accordion',
    titles: ['Home', 'About', 'Contact'],
  },
  play: async ({ canvas }) => {
    
    const homeContent = canvas.getByText(/Home content/i);
    const aboutContent = canvas.getByText(/Storybook/i);
    const contactContent = canvas.getByText(/Contact content/i);
    
    const home = canvas.getByText(/home/i, { selector: 'h2 > .accordion-button' });
    await home.click();
    await sleep(accordionDelay);
    
    expect(homeContent).toBeVisible();
    expect(aboutContent).not.toBeVisible();
    expect(contactContent).not.toBeVisible();

    await sleep(accordionDelay);
    const about = canvas.getByText(/about/i, { selector: 'h2 > .accordion-button' });
    await about.click();
    await sleep(accordionDelay);

    expect(homeContent).not.toBeVisible();
    expect(aboutContent).toBeVisible();
    expect(contactContent).not.toBeVisible();

    await sleep(accordionDelay);
    const contact = canvas.getByText(/contact/i, { selector: 'h2 > .accordion-button' });
    await contact.click();
    await sleep(accordionDelay);
    
    expect(homeContent).not.toBeVisible();
    expect(aboutContent).not.toBeVisible();
    expect(contactContent).toBeVisible();

    await sleep(accordionDelay);
    await contact.click();
    await sleep(accordionDelay);
    
    expect(homeContent).not.toBeVisible();
    expect(aboutContent).not.toBeVisible();
    expect(contactContent).not.toBeVisible();
  }
};
