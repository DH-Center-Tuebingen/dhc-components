// User type (currently prototype) that matches the Laravel user model
export type User = {
    id: number;
    name: string;
    nickname: string;
    email: string;
    avatar_url: string;
}