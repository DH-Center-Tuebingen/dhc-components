import type { Meta, StoryObj } from '@storybook/vue3';

import CommentSystem from './CommentSystem.vue';

const meta: Meta<typeof CommentSystem> = {
    component: CommentSystem,
};

export default meta;

type Story = StoryObj<typeof CommentSystem>;

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
        'user_id': 2,
        'commentable_id': 1,
        'commentable_type': 'App\\Entity',
        'reply_to': null,
        'content': 'Another comment',
        'metadata': [],
        'created_at': '2025-12-31T12:34:57.000000Z',
        'updated_at': '2025-12-31T12:34:57.000000Z',
        'deleted_at': null,
        'replies_count': 2,
        'replies': [
            {
                'id': 4,
                'user_id': 1,
                'commentable_id': 1,
                'commentable_type': 'App\\Entity',
                'reply_to': 2,
                'content': 'This is the first reply',
                'metadata': [],
                'created_at': '2025-12-31T16:00:00.000000Z',
                'updated_at': '2025-12-31T16:34:56.000000Z',
                'deleted_at': null,
                'replies_count': 0,
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
                },
            },
            {
                'id': 5,
                'user_id': 1,
                'commentable_id': 1,
                'commentable_type': 'App\\Entity',
                'reply_to': 2,
                'content': 'This is also a reply to comment #2',
                'metadata': [],
                'created_at': '2025-12-31T17:00:00.000000Z',
                'updated_at': '2025-12-31T17:00:00.000000Z',
                'deleted_at': null,
                'replies_count': 0,
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
                },
            },
        ],
        'author': {
            'id': 2,
            'name': 'Amy Bob',
            'email': 'ab@example.com',
            'created_at': '2024-01-25T02:22:22.000000Z',
            'updated_at': '2024-01-25T02:22:22.000000Z',
            'nickname': 'ab',
            'avatar': 'avatars/2.jpg',
            'metadata': null,
            'deleted_at': null,
            'avatar_url': './storage/avatars/2.jpg'
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
];

export const Default: Story = {
    args: {
        comments: comments,
    },
};