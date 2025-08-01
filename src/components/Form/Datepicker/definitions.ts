import { baseAttributeProps } from '../Attribute/definitions';

export interface DatepickerProps extends baseAttributeProps {
    mode?: string,
    defaultValue: string | Array<string> | null,
}

export interface DatepickerOptions {
    range?: boolean,
    multiCalendars?: boolean,
}