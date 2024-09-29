import { Timestamps, WithId } from './Common';
import { User } from './User';

export type Comment = WithId<{
    content: string;
    updated_at: string | null;
    created_at: string;
    deleted_at: string | null;
    author: User;
    replies_count: number;
    metadata?: CommentMetadata
}> & Timestamps;

export type CommentMetadata = {
    is_empty: boolean;
}