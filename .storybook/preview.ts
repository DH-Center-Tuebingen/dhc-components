import { setup, type Preview } from "@storybook/vue3";
import { fn } from "@storybook/test";
import i18n from "./i18n";

import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import '@/scss/main.scss';
import { ColorfullBackground } from "./backgrounds";

import './story.css';

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
        ColorfullBackground,
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
