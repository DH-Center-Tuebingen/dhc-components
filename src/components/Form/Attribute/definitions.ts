export type AttributeTypeDef = 'boolean' | 'date' | 'daterange' | 'double' | 'integer' | 'si-unit' | 'string';

export interface baseAttributeProps {
    defaultValue: any,
    name?: string,
    disabled?: boolean,
    required?: boolean,
}

export interface AttributeProps extends baseAttributeProps {
    type: AttributeTypeDef,
    metadata: any,
    showText?: boolean,
    debug?: boolean,
}

export interface ChangeEvent {
    value: any,
    dirty: boolean,
    valid: boolean,
}