import type { Meta, StoryObj } from '@storybook/vue3';
import Dropdown from './Dropdown.vue';
import { faBeer, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';

const meta: Meta<typeof Dropdown> = {
  component: Dropdown,
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {

  render: () => ({
    components: { Dropdown },
    setup() {
      const result = ref('Select an option ...');
      const options = [
        { text: 'Coffee', icon: faCoffee, visible: true, action: () => result.value = 'Coffee' },
        { text: 'Beer', icon: faBeer, visible: true, action: () => result.value = 'Beer' },
        { text: 'Tea', icon: null, visible: true, action: () => result.value = 'Tea' },
      ]

      return { options, result }
    },
    template: '<Dropdown :options="options" /><p>{{result}}</p>',
  }),
};
