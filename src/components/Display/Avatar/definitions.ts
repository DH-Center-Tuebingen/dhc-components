import { User } from '../../../types/User';

export interface avatarProps {
    name: string | User,
    max?: number,
    rounded?: boolean,
    shadow?: boolean,
    size?: number,
}