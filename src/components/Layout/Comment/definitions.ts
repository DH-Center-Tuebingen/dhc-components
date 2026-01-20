import { User } from '../../../types/User';

export type commentDataProps = {
    id: number,
    user_id: number,
    reply_to: number | null,
    content: string,
    metadata: any[],
    created_at: string,
    updated_at: string,
    deleted_at: string | null,
    replies_count: number,
    author: User,
};

export type actions = { edit: boolean, delete: boolean, reply: boolean };

export interface CommentProps {
    data: commentDataProps;
    allowedActions: Partial<actions>;
}

export interface CommentListProps {
    comments: Array<commentDataProps>;
}