import { baseAttributeProps } from '../Attribute/definitions';

export interface NumberProps extends baseAttributeProps {
    defaultValue: number | string,
    hideControls?: boolean,
}

interface BaseSpecificProps {
    float?: boolean,
}

export interface BaseNumberProps extends NumberProps, BaseSpecificProps {
}
