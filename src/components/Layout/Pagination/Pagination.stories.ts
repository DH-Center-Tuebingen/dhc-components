import type { Meta, StoryObj } from '@storybook/vue3';

import Pagination from './Pagination.vue';

const meta: Meta<typeof Pagination> = {
    component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
    args: {
        data: {
            total: 125,
            per_page: 15,
            current_page: 1,
            last_page: 9,
            from: 1,
            to: 15,
        },
        displayCount: 2,
    },
};