import type { Meta, StoryObj } from '@storybook/vue3';

import Alert from './Alert.vue';

const meta: Meta<typeof Alert> = {
  component: Alert,
};

export default meta;

type Story = StoryObj<typeof Alert>;

const types = ['success', 'note', 'info', 'warning', 'error', 'mono'] as const;

type AlertProps = {
  type: (typeof types)[number];
  message: string;
  showIcon: boolean;
};

function createAlert({
  type = 'success',
  message = null,
  showIcon = false,
}: AlertProps) {
  const optionalProps = [];

  const optionalParameters = { };
  for (const [key, value] of Object.entries(optionalParameters)) {
    if (value !== null) {
      optionalProps.push(`${key}="${value}"`);
    }
  }
  return `<Alert type="${type}" message="${message}" :showIcon="${showIcon}" ${optionalProps.join(' ')} ></Alert>`;
}

function createAlerts({ message = null, showIcon = false} = {}) {
  const templates: string[] = [];
  for (const type of types) {
    templates.push(
      createAlert({
        type,
        showIcon,
        message: message ??`This is message signifies <b>${type.toUpperCase()}</b>.`,
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

export const Icons: Story = {
  render: () => ({
    components: { Alert },
    template: createAlerts({ showIcon: true }), 
  })
}
