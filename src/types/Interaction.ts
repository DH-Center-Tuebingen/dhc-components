import { Timestamps, WithId } from './Common';
import { User } from './User';

export type Comment = WithId<{
    content: string;
    updated_at?: string;
    created_at: string;
    deleted_at?: string;
    author: User;
    replies_count: number;
    metadata?: CommentMetadata
}> & Timestamps;

export type CommentMetadata = {
    is_empty: boolean;
}