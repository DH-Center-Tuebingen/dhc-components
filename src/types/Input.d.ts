export interface Labeled {
    label: string;
}

export interface CheckboxInput extends Labeled {
    value: boolean;
}

export interface LabeledInput extends Labeled {
    value: string;
}