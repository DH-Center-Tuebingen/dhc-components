import { ReducedThesaurusConcept } from 'src/types/Concept';
import { baseAttributeProps } from '../Attribute/definitions';

export interface TimeperiodProps extends baseAttributeProps {
    defaultValue: Partial<metaValueKeys>,
    mode?: 'timeperiod' | 'epoch',
    metadata: {
        epochs: Array<ReducedThesaurusConcept>,
    },
}

export type valueKeys = 'start' | 'end' | 'startLabel' | 'endLabel' | 'epoch';
export type metaValueKeys = { start: number, end: number, startLabel: timeLabels, endLabel: timeLabels, epoch: number};

export const timeLabelArray = ['BC', 'AD'] as const;
export type timeLabels = typeof timeLabelArray[number];

export const inputFieldsArray = ['start', 'end'] as const;
export type inputFieldKeys = typeof inputFieldsArray[number];