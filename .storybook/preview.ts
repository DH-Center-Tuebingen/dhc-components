import { setup, type Preview } from "@storybook/vue3";
import { fn } from "@storybook/test";
import i18n from "./i18n";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-final-modal/style.css';
import '@/styles/main.scss';

import { ModalsContainer, createVfm } from "vue-final-modal";

setup((app) => {
  const vfm = createVfm()
  app.use(vfm)
  app.use(i18n)
})

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'gray',
      values: [
        { name: 'gray', value: '#999999' },
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
  decorators:[
    (story) => ({
      components: { story, ModalsContainer },
      template: '<ModalsContainer /><story />',
    }),
  ]
};

export default preview;
