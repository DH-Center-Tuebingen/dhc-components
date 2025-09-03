import type { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';

import { StackedIcon } from '@/components/Layout/StackedIcon/definitions';

export interface IconButtonProps {
    active?: boolean;
    activeButtonClass?: string;
    activeIcon?: string | IconDefinition | IconDefinition[];
    activeIconCategory?: string;
    buttonClass?: string;
    disabled?: boolean;
    fixedWidth?: boolean;
    icon?: string | IconDefinition | IconDefinition[];
    icons?: StackedIcon;
    iconCategory?: string;
    loading?: boolean;
    size?: SizeProp;
    small?: boolean;
    unbutton?: boolean;
    title?: string;
}