import { baseAttributeProps } from '../Attribute/definitions';

export type AddressValueKeys = 'street' | 'housenumber' | 'postalcode' | 'city' | 'state' | 'country' | 'coordinates' | 'county';
export type AddressValue = {
    street?: string,
    housenumber?: string,
    postalcode?: string,
    city?: string,
    state?: string,
    country?: string,
    coordinates?: Array<number|string>,
    county?: string,
};

export interface AddressProps extends baseAttributeProps {
    defaultValue: AddressValue,
}
