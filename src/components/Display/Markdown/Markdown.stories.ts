import type { Meta, StoryObj } from '@storybook/vue3';

import Markdown from './Markdown.vue';

const meta: Meta<typeof Markdown> = {
    component: Markdown,
};

export default meta;

type Story = StoryObj<typeof Markdown>;

const content = `
## Header

---

Some **bold** Some *italic* and [a link][1]

A little code sample

    </head>
    <title>Web Page Title</title>
    </head>

A picture

![alt text][2]

A list

- apples
- oranges
- eggs

A numbered list

1. a
2. b
3. c

A little quote

> Cogito ergo sum!

A final paragraph.

[1]: http://www.google.com
[2]: http://www.google.com/intl/en_ALL/images/logo.gif
`;

export const Default: Story = {
    args: {
        data: content,
        // Add props here
    },
    render: (args) => ({
        components: { Markdown },
        setup() {
            return { args };
        },
        template: '<Markdown v-bind="args" />',
    }),
};

export const ReadOnly: Story = {
    args: {
        data: content,
        readonly: true,
        // Add props here
    },
    render: (args) => ({
        components: { Markdown },
        setup() {
            return { args };
        },
        template: '<Markdown v-bind="args" />',
    }),
};