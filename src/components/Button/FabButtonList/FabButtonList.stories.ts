import type { Meta, StoryObj } from '@storybook/vue3';

import FabButtonList from './FabButtonList.vue';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof FabButtonList> = {
  component: FabButtonList,
};

export default meta;

type Story = StoryObj<typeof FabButtonList>;

export const Default: Story = {
  args: {
    buttons: [
        { icon: faPlus, color: 'primary', action: () => alert('Add clicked') },
        { icon: faEdit, color: 'warning', action: () => alert('Edit clicked') },
        { icon: faTrash, color: 'danger', action: () => alert('Delete clicked') },
    ]
  },
  render: (args : any) => ({
    components: { FabButtonList },
    setup() {
        return { args };
    },
    template: '<FabButtonList v-bind="args" />',
  }),
};