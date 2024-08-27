import type { Meta, StoryObj } from '@storybook/vue3';

import Alert from './Alert.vue';

const meta: Meta<typeof Alert> = {
  component: Alert,
};

export default meta;

const shortMessage = 'The requested ressource is ready now!';

type Story = StoryObj<typeof Alert>;

const types = ['success', 'note', 'info', 'warning', 'error', 'mono'] as const;

type AlertProps = {
  type: (typeof types)[number];
  message: string;
};

function createAlert({
  type = 'success',
  message = shortMessage
}: AlertProps) {
  const optionalProps = [];

  const optionalParameters = { };
  for (const [key, value] of Object.entries(optionalParameters)) {
    if (value !== null) {
      optionalProps.push(`${key}="${value}"`);
    }
  }
  return `<Alert type="${type}" message="${message}" ${optionalProps.join(' ')} ></Alert>`;
}

function createAlerts({ message = shortMessage} = {}) {
  const templates: string[] = [];
  for (const type of types) {
    templates.push(
      createAlert({
        type,
        message: `<b>[${type.toUpperCase()}]</b> ${message}`,
      }),
    );
  }
  return templates.join('<br>');
}

export const Info: Story = {
  render: () => ({
    components: { Alert },
    template: createAlerts(),
  }),
};

// export const Icons: Story = {
//   render: () => ({
//     components: { Alert },
//     template: createAlerts({ message: 'This is a message with an icon', noicon: false }), 
//   })
// }
