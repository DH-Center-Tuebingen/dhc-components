import type { Meta, StoryObj } from '@storybook/vue3';

import Alert from './Alert.vue';

const meta: Meta<typeof Alert> = {
    component: Alert,
};

export default meta;

const shortMessage = 'The requested ressource is ready now!'

type Story = StoryObj<typeof Alert>;

const types = ['success', 'note', 'info', 'warning', 'error', 'mono'] as const;


type AlertProps = {
    type: typeof types[number];
    message: string;
    toast?: boolean | null;
}

function createAlert({ type = 'success', message = shortMessage, toast = null }: AlertProps) {

    const optionalProps = []

    const optionalParameters = {toast}
    for (const [key, value] of Object.entries(optionalParameters)) {
        if (value !== null) {
            optionalProps.push(`${key}="${value}"`)
        }
    }
    console.log(optionalProps)
    return `<Alert type="${type}" message="${message}" ${optionalProps.join(' ')} ></Alert>`
}

function createAlerts({ message = shortMessage, toast = null } = {}) {
    const templates: string[] = []
    for (const type of types) {
        templates.push(createAlert({ type, message: `<b>[${type.toUpperCase()}]</b> ${message}`, toast }))
    }
    return templates.join('<br>')
}

export const Info: Story = {
    render: () => ({
        components: { Alert },
        template: createAlerts(),
    })
};
