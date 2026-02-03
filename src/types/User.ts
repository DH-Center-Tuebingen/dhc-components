// User type (currently prototype) that matches the Laravel user model
export type User = {
    id: number;
    name: string;
    nickname: string;
    email: string;
    avatar_url: string;
    created_at: string;
    updated_at: string;
    avatar: string;
    metadata: any;
    deleted_at: string | null;
}