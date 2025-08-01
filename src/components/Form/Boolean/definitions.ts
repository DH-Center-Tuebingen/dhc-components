import { baseAttributeProps } from '../Attribute/definitions';

export interface BooleanProps extends baseAttributeProps {
    defaultValue: boolean | string | null,
    showText?: boolean,
}
