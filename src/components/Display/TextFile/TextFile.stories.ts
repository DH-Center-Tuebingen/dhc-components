import type { Meta, StoryObj } from '@storybook/vue3';

import TextFile from './TextFile.vue';

const meta: Meta<typeof TextFile> = {
    component: TextFile,
};

export default meta;

type Story = StoryObj<typeof TextFile>;

export const Default: Story = {
    args: {
        // Add props here
        value: `Amet esse adipisicing deserunt fugiat amet eiusmod excepteur sunt cupidatat veniam ad eiusmod sit. Ullamco consectetur esse qui et ullamco tempor quis nisi elit amet labore non Lorem. Non eu in adipisicing fugiat voluptate. Excepteur occaecat magna duis anim officia voluptate dolore cupidatat commodo esse minim pariatur qui consectetur.

Quis commodo laborum minim dolore eu amet duis. Officia deserunt esse sint commodo laboris eiusmod duis esse non. Pariatur incididunt ipsum laborum officia commodo ad aliquip duis. Nostrud culpa sunt tempor elit.

Laboris commodo ex pariatur deserunt. Cillum nisi tempor reprehenderit pariatur. Adipisicing ex non esse laborum exercitation enim laborum irure duis. Est voluptate nisi aliquip amet duis adipisicing exercitation sunt voluptate qui.

Labore ex in minim minim mollit adipisicing. Duis aute aute reprehenderit qui eu elit cillum fugiat esse anim do officia culpa. Dolor mollit duis dolore eiusmod laboris ipsum qui sunt ullamco do.

Exercitation enim ex deserunt qui non minim ut amet cillum dolore enim dolor in ut. Esse minim cupidatat officia irure nisi consequat Lorem sit deserunt adipisicing laboris ipsum. Velit in labore exercitation ea aliquip reprehenderit aliquip qui ea.

Eiusmod in proident eu officia in elit aliquip qui tempor officia. Proident do cupidatat duis mollit occaecat excepteur cillum ipsum et incididunt est eu. Ad excepteur velit commodo deserunt id in deserunt veniam occaecat do est amet magna. Incididunt est consectetur sint est consectetur reprehenderit excepteur est dolor et est exercitation commodo anim. Duis nisi consectetur exercitation proident ea consequat ullamco irure aliquip.

Ullamco mollit culpa et cillum labore occaecat voluptate veniam officia esse do. Reprehenderit elit voluptate officia aliquip consectetur cillum. Cupidatat reprehenderit id ipsum labore consectetur do ad. Et quis aliquip cillum id. Quis quis ea reprehenderit amet ex qui adipisicing ut voluptate id et esse.

Labore exercitation cupidatat sint tempor nisi laborum. Ullamco laborum anim tempor enim labore eiusmod. Culpa est aute consequat consectetur. Lorem quis esse do eiusmod ullamco sit voluptate cillum enim aute cupidatat commodo labore eu. Dolore dolore incididunt pariatur fugiat cupidatat et exercitation non ad qui Lorem velit. Laborum cupidatat exercitation duis nisi. Irure ut consectetur velit non reprehenderit qui excepteur dolor nisi tempor veniam amet adipisicing.

Culpa proident proident ipsum id proident. Ut id et eiusmod ex do. Excepteur est tempor velit minim cillum et ipsum minim culpa officia duis est. Duis veniam nostrud dolor anim deserunt culpa et aliquip minim Lorem. In occaecat cillum reprehenderit velit tempor occaecat enim elit. Consectetur consequat elit dolore mollit exercitation. Ut dolore et excepteur voluptate sit nostrud.
        `},
    render: (args: any) => ({
        components: { TextFile },
        setup() {
            return { args };
        },
        // We set a max-height to check if the overflow behaves correctly
        template: '<TextFile style="max-height:512px" v-bind="args" />',
    }),
};

export const SansSerif: Story = {
    args: {
        // Add props here
        sansSerif: true,
        value: `Amet esse adipisicing deserunt fugiat amet eiusmod excepteur sunt cupidatat veniam ad eiusmod sit. Ullamco consectetur esse qui et ullamco tempor quis nisi elit amet labore non Lorem. Non eu in adipisicing fugiat voluptate. Excepteur occaecat magna duis anim officia voluptate dolore cupidatat commodo esse minim pariatur qui consectetur.

Quis commodo laborum minim dolore eu amet duis. Officia deserunt esse sint commodo laboris eiusmod duis esse non. Pariatur incididunt ipsum laborum officia commodo ad aliquip duis. Nostrud culpa sunt tempor elit.
        `},
    render: (args: any) => ({
        components: { TextFile },
        setup() {
            return { args };
        },
        // We set a max-height to check if the overflow behaves correctly
        template: '<TextFile style="max-height:512px" v-bind="args" />',
    }),
};