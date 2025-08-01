import { baseAttributeProps } from '../Attribute/definitions';

export interface NumberProps extends baseAttributeProps {
    defaultValue: number | string,
    float?: boolean,
}
