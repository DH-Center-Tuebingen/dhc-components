import type { Ref } from 'vue';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { StackedIcon } from '@/components/Layout/StackedIcon/definitions';

export type Tool = {
    name: string,
    action: () => void,
    icon?: IconDefinition | IconDefinition[],
    icons?: StackedIcon,
    class?: Ref<string>,
    disabled?: boolean
    title?: string
};