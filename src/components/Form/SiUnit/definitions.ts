import { baseAttributeProps } from '../Attribute/definitions';

export interface SiUnitProps extends baseAttributeProps {
    defaultValue: any,
    metadata?: Partial<Record<'si_baseunit' | 'si_default', string>>,
}
