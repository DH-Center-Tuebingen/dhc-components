import { User } from '../../../types/User';

export interface AvatarProps {
    name: string | User,
    max?: number,
    rounded?: boolean,
    shadow?: boolean,
    size?: number,
}