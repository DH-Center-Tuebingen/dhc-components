import type { Meta, StoryObj } from '@storybook/vue3';

import CsvTable from './CsvTable.vue';

const meta: Meta<typeof CsvTable> = {
    component: CsvTable,
};

export default meta;
type Story = StoryObj<typeof CsvTable>;

export const Info: Story = {
    render: () => ({
        components: { CsvTable },
        template: `<CsvTable />`,
    })
};