import type { Meta, StoryObj } from '@storybook/vue3';

import Comment from './Comment.vue';

const meta: Meta<typeof Comment> = {
    component: Comment,
};

export default meta;

type Story = StoryObj<typeof Comment>;

const comments = [
    {
        'id': 1,
        'user_id': 1,
        'commentable_id': 1,
        'commentable_type': 'App\\Entity',
        'reply_to': null,
        'content': 'Simple testing comment\n- Item 1 \n- Item 2',
        'metadata': [],
        'created_at': '2025-12-31T12:00:00.000000Z',
        'updated_at': '2025-12-31T12:34:56.000000Z',
        'deleted_at': null,
        'replies_count': 0,
        'replies': [],
        'author': {
            'id': 1,
            'name': 'John Doe',
            'email': 'john@example.com',
            'created_at': '2024-01-24T09:33:59.000000Z',
            'updated_at': '2024-01-24T09:59:29.000000Z',
            'nickname': 'jd',
            'avatar': 'avatars/1.jpg',
            'metadata': null,
            'deleted_at': null,
            'avatar_url': './storage/avatars/1.jpg'
        }
    },
    {
        'id': 2,
        'user_id': 1,
        'commentable_id': 1,
        'commentable_type': 'App\\Entity',
        'reply_to': null,
        'content': 'Another comment',
        'metadata': [],
        'created_at': '2025-12-31T12:34:57.000000Z',
        'updated_at': '2025-12-31T12:34:57.000000Z',
        'deleted_at': null,
        'replies_count': 0,
        'replies': [],
        'author': {
            'id': 1,
            'name': 'John Doe',
            'email': 'john@example.com',
            'created_at': '2024-01-24T09:33:59.000000Z',
            'updated_at': '2024-01-24T09:59:29.000000Z',
            'nickname': 'jd',
            'avatar': 'avatars/1.jpg',
            'metadata': null,
            'deleted_at': null,
            'avatar_url': './storage/avatars/1.jpg'
        }
    },
    {
        'id': 3,
        'user_id': 1,
        'commentable_id': 1,
        'commentable_type': 'App\\Entity',
        'reply_to': null,
        'content': 'And the last comment',
        'metadata': [],
        'created_at': '2025-12-31T12:35:00.000000Z',
        'updated_at': '2025-12-31T12:35:00.000000Z',
        'deleted_at': null,
        'replies_count': 0,
        'replies': [],
        'author': {
            'id': 1,
            'name': 'John Doe',
            'email': 'john@example.com',
            'created_at': '2024-01-24T09:33:59.000000Z',
            'updated_at': '2024-01-24T09:59:29.000000Z',
            'nickname': 'jd',
            'avatar': 'avatars/1.jpg',
            'metadata': null,
            'deleted_at': null,
            'avatar_url': './storage/avatars/1.jpg'
        }
    }
];

const singleComment = comments[0];
const deletedComment = {
    ...comments[0],
    deleted_at: '2026-01-01T10:10:10.000000Z',
};
const uneditedComment = {
    ...comments[0],
    updated_at: '2025-12-31T12:00:00.000000Z',
};

export const Default: Story = {
    args: {
        data: singleComment,
    },
};

export const Deleted: Story = {
    args: {
        data: deletedComment,
    },
};

export const NotEdited: Story = {
    args: {
        data: uneditedComment,
    },
};

export const OnlyReplyAllowed: Story = {
    args: {
        data: singleComment,
        allowedActions: {
            reply: true,
            edit: false,
            delete: false,
        },
    },
};