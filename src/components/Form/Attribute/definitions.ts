const attributeTypes = [
    'boolean',
    'date',
    'daterange',
    'dimension',
    'double',
    'iconclass',
    'integer',
    'list',
    'rism',
    'si-unit',
    'string',
    'stringfield',
    'url',
] as const;
export type AttributeTypeDef = typeof attributeTypes[number];

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