export type MultiSelectOptions = {
    asObject?: boolean,
    valueProp?: string,
    disabledProp?: string,
    label?: string,
    hideSelected?: boolean,
    searchable?: boolean,
    trackBy?: string | Array<string>, // used if searchable = true
    limit?: number,
    optionsPlaceholder?: string,
    resultsPlaceholder?: string,
    customSearch?: Function,
}