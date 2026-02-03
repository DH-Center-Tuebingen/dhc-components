import { BackgroundColor } from '@/types/Colors';

export interface BadgeProps {
    content: string,
    style?: 'rounded' | 'unrounded' | 'pill',
    color?: BackgroundColor,
    outline?: boolean,
}