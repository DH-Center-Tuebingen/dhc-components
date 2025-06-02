export interface DatepickerProps {
    name?: string,
    mode?: string,
    disabled?: boolean,
    value?: string | Array<string>,
}

export interface DatepickerOptions {
    range?: boolean,
    multiCalendars?: boolean,
}