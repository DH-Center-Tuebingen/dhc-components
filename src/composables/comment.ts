import { computed } from 'vue';

import type { User } from '§/User';
import type { Comment } from '§/Comment'

import {
    Visual,
} from 'dhc-utils'

const mentionify = Visual.mentionify;

export default function useComment(comment: Comment, activeUser: User) {

    const isDeleted = computed(() => {
        return !!comment.deleted_at;
    });

    const isOwn = computed(() => {
        return activeUser.id === comment.author.id;
    });

    const formattedComment = computed(() => {
        const parts = comment.content.split(/((\r\n|\n)+)/g);

        for (const part in parts) {
            parts[part] = mentionify(parts[part], (text, attribute) => {
                return {
                    id: null,
                    nickname: text,
                    name: text,
                }
            });
        }

        return parts
            .filter((txt: string) => txt.trim() !== '')
            .map((part: string) => {
                return `<p>${part}</p>`;
            })
            .join('');
    });

    const author = computed(() => {
        return comment?.author ?? {
            id: 0,
            nickname: 'Unknown',
        };
    });

    return {
        author,
        isDeleted,
        isOwn,
        formattedComment,
    };
}
