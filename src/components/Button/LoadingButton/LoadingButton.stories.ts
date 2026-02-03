import type { Meta, StoryObj } from '@storybook/vue3';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import LoadingButton from './LoadingButton.vue';

const waitFor = async (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));
/**
 * The LoadingButton component is deprecated and merged into IconButton.
 *
 * Please check if all functionality is available [VR]
 */
const meta: Meta<typeof LoadingButton> = {
    component: LoadingButton,
    parameters: {
        slots: {
            default: {
                description: 'Default slot',
                template: `<span>{{ args.default }}</span>`,
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof LoadingButton>;

export const Default: Story = {
    args: {
        loading: false,
        default: 'Click me',
        color: 'primary',
        action: waitFor,
    },
};

export const Loading: Story = {
    args: {
        loading: true,
        default: 'Click me',
        color: 'primary',
        action: waitFor,
    },
};

export const Outline: Story = {
    args: {
        loading: false,
        default: 'Click me',
        color: 'dark',
        outlined: true,
        action: waitFor,
    },
};

export const OutlineLoading: Story = {
    args: {
        loading: true,
        default: 'Click me',
        color: 'dark',
        outlined: true,
        action: waitFor,
    },
};

export const LoadingWithIconSlot: Story = {
    args: {
        loading: false,
        color: 'primary',
        action: waitFor,
        icon: faUser,
    },
    render: (args: any) => ({
        components: {
            FontAwesomeIcon,
            LoadingButton,
        },
        setup() {
            return {
                args,
                icon: faUser,
            };
        },
        template: `
        <LoadingButton v-bind="args">
            <template #icon>
                <FontAwesomeIcon :icon="icon" class="fa-fw" />
            </template>
            Click me
        </LoadingButton>`,
    }),
};
