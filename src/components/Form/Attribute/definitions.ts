export type AttributeTypeDef = 'date' | 'daterange' | 'double' | 'integer' | 'string';

export interface AttributeProps {
    type: AttributeTypeDef,
    defaultValue: any,
    name?: string,
    disabled?: boolean,
    required?: boolean,
    debug?: boolean,
}

export interface ChangeEvent {
    value: any,
    dirty: boolean,
    valid: boolean,
}