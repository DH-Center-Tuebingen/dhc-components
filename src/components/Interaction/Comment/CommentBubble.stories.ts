import type { Meta, StoryObj } from '@storybook/vue3';

import CommentBubble from './CommentBubble.vue';
import type { Comment } from 'src/types/Interaction';
import { Jane, Ludwig } from '@/mock/user';
import { onMounted, ref } from 'vue';

const meta: Meta<typeof CommentBubble> = {
    component: CommentBubble,
};

export default meta;

Jane.permissions = ['comments_create', 'comments_edit', 'comments_delete'];
Ludwig.permissions = ['comments_create', 'comments_edit', 'comments_delete'];

const janeComment: Comment = {
    id: 1,
    created_at: '2021-01-01',
    updated_at: '2023-01-02',
    deleted_at: undefined,
    content: 'Jemand musste @josefk verleumdet haben, denn ohne dass er etwas Böses getan hätte, wurde er eines Morgens verhaftet.\n\n »Wie ein Hund!« sagte er, es war, als sollte die Scham ihn überleben.',
    author: Jane,
    replies_count: 0,
}

const ludwigComment: Comment = {
    id: 2,
    created_at: '2021-01-01',
    updated_at: '2023-01-02',
    deleted_at: undefined,
    content: `Als @gregor_samsa eines Morgens aus unruhigen Träumen erwachte, fand er sich in seinem Bett zu einem ungeheueren Ungeziefer verwandelt. 
  
  Er lag auf seinem panzerartig harten Rücken und sah, wenn er den Kopf ein wenig hob, seinen gewölbten, braunen, von bogenförmigen Versteifungen 
  geteilten Bauch, auf dessen Höhe sich die Bettdecke, zum gänzlichen Niedergleiten bereit, kaum noch erhalten konnte. 
  Seine vielen, im Vergleich zu seinem sonstigen Umfang kläglich dünnen Beine flimmerten ihm hilflos vor den Augen.`,
    author: Ludwig,
    replies_count: 0,
}

type Story = StoryObj<typeof CommentBubble>;

export const Default: Story = {
    args: {
        comment: janeComment,
        activeUser: Jane,
    },
    render: (args) => ({
        components: { CommentBubble },
        setup() {
            return { args };
        },
        template: '<CommentBubble v-bind="args" />',
    }),
};

export const Other: Story = {
    args: {
        comment: ludwigComment,
        activeUser: Jane,
    },
    render: (args) => ({
        components: { CommentBubble },
        setup() {
            return { args };
        },
        template: '<CommentBubble v-bind="args" />',
    }),
};

const deletedJaneComment = {
    ...janeComment,
    deleted_at: '2023-01-02',
}

export const Deleted: Story = {
    args: {
        comment: deletedJaneComment,
        activeUser: Jane,
    },
    render: (args) => ({
        components: { CommentBubble },
        setup() {
            return { args };
        },
        template: '<CommentBubble v-bind="args" />',
    }),
};

export const Editing: Story = {
    args: {
        comment: janeComment,
        activeUser: Jane,
    },
    render: (args) => ({
        components: { CommentBubble },
        setup() {
            const commentBubble = ref<InstanceType<typeof CommentBubble>>();
            onMounted(() => {
                if (commentBubble?.value) { commentBubble.value.edit(); }
            })
            const save = (text: string, callback: Function) => {
                setTimeout(() => {
                    args.comment.content = text;
                    callback();
                },1000)
            }
            return { args, commentBubble, save };
        },
        template: '<CommentBubble ref="commentBubble" @save="save" v-bind="args" />',
    }),
    play: async ({ canvas }) => {
        const dropdown = await canvas.getByLabelText('comment-actions');
        dropdown.click();
    }
};