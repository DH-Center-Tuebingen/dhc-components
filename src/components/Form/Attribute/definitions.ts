const attributeTypes = [
    'boolean',
    'date',
    'daterange',
    'dimension',
    'double',
    'epoch',
    'iconclass',
    'integer',
    'list',
    'range',
    'rism',
    'serial',
    'si-unit',
    'string',
    'stringfield',
    'string-sc',
    'string-mc',
    'timeperiod',
    'url',
] as const;
export type AttributeTypeDef = typeof attributeTypes[number];

export type metaKeys = 'valid' | 'dirty' | 'value';
export type metaValues = {valid: boolean, dirty: boolean, value: any};

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