import type { Meta, StoryObj } from '@storybook/vue3';

import AutoTextArea from './AutoTextArea.vue';

const meta: Meta<typeof AutoTextArea> = {
  component: AutoTextArea,
};

export default meta;

type Story = StoryObj<typeof AutoTextArea>;

export const Default: Story = {
  args: {
    // Add props here
    modelValue: ['Jemand mußte Josef K. verleumdet haben, denn ohne daß er etwas Böses getan hätte, wurde er eines Morgens verhaftet.',
            'Die Köchin der Frau Grubach, seiner Zimmervermieterin, die ihm jeden Tag gegen acht Uhr früh das Frühstück brachte,',
            'kam diesmal nicht. Das war noch niemals geschehen. K. wartete noch ein Weilchen, sah von seinem Kopfkissen aus die',
            'alte Frau, die ihm gegenüber wohnte und die ihn mit einer an ihr ganz ungewöhnlichen Neugierde beobachtete, dann aber,',
            'gleichzeitig befremdet und hungrig, läutete er. Sofort klopfte es und ein Mann, den er in dieser Wohnung noch niemals gesehen hatte, trat ein.',
    ].join(' '),
  },
  render: (args : any) => ({
    components: { AutoTextArea },
    setup() {
        return { args };
    },
    template: '<AutoTextArea v-bind="args" />',
  }),
};

export const LimitedHeight: Story = {
    args: {
      // Add props here
      modelValue: ['Jemand mußte Josef K. verleumdet haben, denn ohne daß er etwas Böses getan hätte, wurde er eines Morgens verhaftet.',
              'Die Köchin der Frau Grubach, seiner Zimmervermieterin, die ihm jeden Tag gegen acht Uhr früh das Frühstück brachte,',
              'kam diesmal nicht. Das war noch niemals geschehen. K. wartete noch ein Weilchen, sah von seinem Kopfkissen aus die',
              'alte Frau, die ihm gegenüber wohnte und die ihn mit einer an ihr ganz ungewöhnlichen Neugierde beobachtete, dann aber,',
              'gleichzeitig befremdet und hungrig, läutete er. Sofort klopfte es und ein Mann, den er in dieser Wohnung noch niemals gesehen hatte, trat ein.',
              '',
              'Er war schlank und doch fest gebaut, er trug ein anliegendes schwarzes Kleid, das, ähnlich den Reiseanzügen, mit verschiedenen Falten, Taschen, Schnallen,',
              'Knöpfen und einem Gürtel versehen war und infolgedessen, ohne daß man sich darüber klar wurde, wozu es dienen sollte, besonders praktisch erschien.',
              '»Wer sind Sie?« fragte K. und saß gleich halb aufrecht im Bett. Der Mann aber ging über die Frage hinweg, als müsse man seine Erscheinung hinnehmen',
              'und sagte bloß seinerseits: »Sie haben geläutet?« »Anna soll mir das Frühstück bringen«, sagte K. und versuchte, zunächst stillschweigend, durch Aufmerksamkeit',
              'und Überlegung festzustellen, wer der Mann eigentlich war.',
              
      ].join(' '),
      maxHeight: 100,
    },
    render: (args : any) => ({
      components: { AutoTextArea },
      setup() {
          return { args };
      },
      template: '<AutoTextArea v-bind="args" />',
    }),
  };