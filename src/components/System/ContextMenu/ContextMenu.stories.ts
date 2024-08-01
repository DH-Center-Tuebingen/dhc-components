import type { Meta, StoryObj } from '@storybook/vue3';

import ContextMenu from './ContextMenu.vue';
import { usePreventContextDecorator } from '../../../../.storybook/decorators';


const meta: Meta<typeof ContextMenu> = {
    component: ContextMenu,
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
    render: (args) => ({
        components: { ContextMenu },
        setup() {
            return { args }
        },
        template: `<ContextMenu>
                        <ul class="dropdown-menu" v-bind="args">
                            <li class="dropdown-item">Item 1</li>
                            <li class="dropdown-item">Item 2</li>
                            <li class="dropdown-item">Item 3</li>
                        </ul>
                    </ContextMenu>`,
    }),
    ...usePreventContextDecorator(() => console.log('ContextMenu')),
};
