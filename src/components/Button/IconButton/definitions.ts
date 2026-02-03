import type { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';

import { StackedIcon } from '@/components/Layout/StackedIcon/definitions';

import { ButtonColors } from '@/types/Colors';

export interface IconButtonProps {
    active?: boolean;
    activeButtonClass?: ButtonColors;
    activeIcon?: string | IconDefinition | IconDefinition[];
    activeIconCategory?: string;
    buttonClass?: ButtonColors;
    disabled?: boolean | Function;
    fixedWidth?: boolean;
    icon?: string | IconDefinition | IconDefinition[];
    icons?: StackedIcon;
    iconCategory?: string;
    loading?: boolean;
    size?: SizeProp;
    small?: boolean;
    unbutton?: boolean;
    outlined?: boolean;
    title?: string;
    text?: string;
}