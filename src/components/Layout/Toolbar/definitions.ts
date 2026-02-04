import type { Ref } from 'vue';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { StackedIcon } from '@/components/Layout/StackedIcon/definitions';
import { ButtonColors } from 'src/types/Colors';

export type Tool = {
    name: string,
    active?: Ref<boolean>,
    action: () => void,
    icon?: IconDefinition | IconDefinition[],
    icons?: StackedIcon,
    class?: Ref<ButtonColors>,
    disabled?: boolean
    title?: string
};