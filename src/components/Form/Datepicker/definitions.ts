export interface DatepickerProps {
    name?: string,
    mode?: string,
    disabled?: boolean,
    required?: boolean,
    defaultValue?: string | Array<string>,
}

export interface DatepickerOptions {
    range?: boolean,
    multiCalendars?: boolean,
}