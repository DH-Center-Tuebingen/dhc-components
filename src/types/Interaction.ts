import { WithId } from './Common';

export type Comment = WithId<{
    content: string;
    updated_at: string;
    created_at: string;
}>