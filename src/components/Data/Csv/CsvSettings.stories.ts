import type { Meta, StoryObj } from '@storybook/vue3';

import CsvSettings from './CsvSettings.vue';

const meta: Meta<typeof CsvSettings> = {
    component: CsvSettings,
};

export default meta;
type Story = StoryObj<typeof CsvSettings>;

export const Info: Story = {
    render: () => ({
        components: { CsvSettings },
        template: `<CsvSettings />`,
    })
};