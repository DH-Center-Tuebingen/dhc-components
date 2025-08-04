export type AttributeTypeDef = 'boolean' | 'date' | 'daterange' | 'double' | 'integer' | 'list' | 'si-unit' | 'string' | 'stringfield';

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