import type { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';

import { StackedIconProps } from '@/components/Layout/StackedIcon/definitions';

export interface IconButtonProps {
    active?: boolean;
    activeButtonClass?: string;
    activeIcon?: string | IconDefinition;
    activeIconCategory?: string;
    buttonClass?: string;
    disabled?: boolean;
    fixedWidth?: boolean;
    icon?: string | IconDefinition;
    icons?: StackedIconProps;
    iconCategory?: string;
    loading?: boolean;
    size?: SizeProp;
    small?: boolean;
    unbutton?: boolean;
    title?: string;
}