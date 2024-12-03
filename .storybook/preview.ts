import { setup, type Preview } from "@storybook/vue3";
import { fn } from "@storybook/test";
import i18n from "./i18n";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/main.css';

setup((app) => {
  app.use(i18n)
})

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [
        { name: 'gray', value: '#eeeeee' },
        { name: 'dark', value: '#000000' },
      ],
    },
    args: {
      onClick: fn(),
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ["autodocs"]
};

export default preview;
