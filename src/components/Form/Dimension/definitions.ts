import { baseAttributeProps } from '../Attribute/definitions';

export type metaValueKeys = { B: number, H: number, T: number, unit: unitKeys};

export const unitsAsArray = ['nm', 'µm', 'mm', 'cm', 'dm', 'm', 'km'] as const;
export const dimsAsArray = ['B', 'H', 'T'] as const;
export type unitKeys = typeof unitsAsArray[number];
export type dimKeys = typeof dimsAsArray[number];
export type valueKeys = 'unit' | dimKeys;

export interface DimensionProps extends baseAttributeProps {
    defaultValue: Partial<metaValueKeys>,
}
