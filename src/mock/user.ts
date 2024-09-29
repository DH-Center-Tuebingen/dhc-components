import { User } from 'src/types/User';

export const Jane: User = {
    name: 'Jane Doe',
    nickname: 'jeannette',
    avatar: true,
    avatar_url: '/img/users/user-1.svg',
    email: 'jane.doe@mail.com',
    created_at: '2021-01-01',
    updated_at: '2021-01-02',
    deleted_at: null,
    metadata: {
        phonenumber: '123-456-7890',
        orcid: '0000-0000-0000-0000',
        department: 'Computer Science',
        institution: 'University of California, Berkeley',
        field: 'Artificial Intelligence',
        role: 'Professor'
    }
};

export const Ludwig: User = {
    name: 'Ludwig Zimmermann',
    nickname: 'ludwigZett',
    avatar: true,
    avatar_url: '/img/users/user-2.svg',
    email: ''
}

export const UserList: Array<User> = [
    Jane,
    Ludwig,
] 