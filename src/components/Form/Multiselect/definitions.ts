import { baseAttributeProps } from '../Attribute/definitions';

export interface MultiselectProps extends baseAttributeProps {
    defaultValue: Record<string, any>,
    mode: 'single' | 'multiple',
    options: Array<any>,
}
