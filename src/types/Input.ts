export type Labeled = {
    label: string;
}

export type CheckboxInput = Labeled & {
    value: boolean;
}

export type LabeledInput = Labeled & {
    value: string;
}