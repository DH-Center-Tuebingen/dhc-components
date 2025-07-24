import { expect } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import { sleep } from '../../../../.storybook/utils';

import Accordion from './Accordion.vue';


const accordionDelay = 400;

const accordionContent = {
    ['home-section']: '<p>Minim exercitation aliqua non et est ipsum occaecat consectetur in do. Incididunt Lorem fugiat magna dolore ullamco. Proident incididunt sit sunt proident nostrud consequat. Incididunt tempor adipisicing deserunt cupidatat sit non do est dolore ea cupidatat culpa minim commodo. Mollit eiusmod irure minim laborum sunt elit consequat dolore sit ex.</p><p>Do et do aute fugiat fugiat qui anim deserunt sit esse irure. Anim aliquip reprehenderit minim adipisicing fugiat reprehenderit nostrud ipsum. Aute officia adipisicing est culpa ullamco irure culpa duis cillum minim duis culpa eiusmod.</p><p>Qui id ex Lorem fugiat. Sunt excepteur eiusmod est ut enim deserunt exercitation labore fugiat veniam. Eu incididunt fugiat amet fugiat mollit adipisicing eiusmod nisi non id anim sit fugiat ad.</p>',
    ['team-section']: `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Alice Smith</td>
                    <td>+1 555 123 4567</td>
                    <td>alice.smith@example.com</td>
                </tr>
                <tr>
                    <td>Bob Johnson</td>
                    <td>+1 555 987 6543</td>
                    <td>bob.johnson@example.com</td>
                </tr>
                <tr>
                    <td>Charlie Beige</td>
                    <td>+1 555 222 3333</td>
                    <td>charlie.beige@example.com</td>
                </tr>
            </tbody>
        </table>
    `,
    ['contact-section']: `
        <h3>Contact Us</h3>
        <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Example Street, 10115 Berlin</p>
        <form>
            <input type="text" placeholder="Your Name" /><br/>
            <input type="email" placeholder="Your Email" /><br/>
            <textarea placeholder="Your Message"></textarea><br/>
            <button type="submit">Send</button>
        </form>
    `,
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
      <Accordion v-bind="args">
          ${createSlotsFromObject(accordionContent)}
      </Accordion>
    `
  }),
};

const items = [
  { name: 'home-section', title: 'Home' },
  { name: 'team-section', title: 'Team', flush: true },
  { name: 'contact-section', title: 'Contact' },
];

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
    args: {
        name: 'default-accordion',
        items,
    }
}

export const Flush: Story = {
    args: {
        name: 'flush-accordion',
        items,
        open: true,
        flush: true,
    }
}

export const Dynamic: Story = {
  args: {
    name: 'dynamic-accordion',
    items,
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

    expect(homeContent).toBeVisible();
    expect(aboutContent).toBeVisible();
    expect(contactContent).not.toBeVisible();

    await sleep(accordionDelay);
    const contact = canvas.getByText(/contact/i, { selector: 'h2 > .accordion-button' });
    await contact.click();
    await sleep(accordionDelay);
    
    expect(homeContent).toBeVisible();
    expect(aboutContent).toBeVisible();
    expect(contactContent).toBeVisible();

    await sleep(accordionDelay);
    await contact.click();
    await sleep(accordionDelay);
    
    expect(homeContent).toBeVisible();
    expect(aboutContent).toBeVisible();
    expect(contactContent).not.toBeVisible();
    
    await sleep(accordionDelay);
    await about.click();
    await sleep(accordionDelay);
    
    expect(homeContent).toBeVisible();
    expect(aboutContent).not.toBeVisible();
    expect(contactContent).not.toBeVisible();
    
    await sleep(accordionDelay);
    await home.click();
    await sleep(accordionDelay);
    
    expect(homeContent).not.toBeVisible();
    expect(aboutContent).not.toBeVisible();
    expect(contactContent).not.toBeVisible();
  }
};
