import type { Meta, StoryObj } from '@storybook/vue3';

import CsvView from './CsvView.vue';

const meta: Meta<typeof CsvView> = {
    component: CsvView,
};

export default meta;
type Story = StoryObj<typeof CsvView>;

export const Info: Story = {
    render: () => ({
        components: { CsvView },
        template: `<CsvView />`,
    })
};