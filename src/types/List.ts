import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { type Ref, type ComputedRef } from 'vue';

export type ListItem = {
    name: string;
    class?: Array<string> | string | Record<string, boolean>;
    icon?: IconDefinition;
    routerLink?: string;
    action?: Function;
    disabled?: boolean;
    loading?: boolean;
}

export type ListExecutionContext = {
    executing: ComputedRef<boolean>;
    executionCount: Readonly<Ref<number>>;
    startExecution: () => void;
    endExecution: () => void;
    wrapExecution: (action: () => Promise<void>) => Promise<void>;
};