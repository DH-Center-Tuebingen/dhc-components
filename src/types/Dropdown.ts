import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type DropdownOption = {
    text: string;
    icon?: IconDefinition;
    visible: boolean;
    action: () => void;
}