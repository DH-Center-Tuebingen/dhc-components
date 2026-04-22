import { BackgroundColor } from '@/types/Colors';

export interface BadgeProps {
    content: string,
    styling?: 'rounded' | 'unrounded' | 'pill',
    color?: BackgroundColor,
    outline?: boolean,
}