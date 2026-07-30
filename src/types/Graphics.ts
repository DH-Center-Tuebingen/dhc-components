
export type RulerLabel = {
    size?: number;
    padding?:number;
    family?: string;
    weight?: number;
    italic?: boolean;
}

export type Ruler = {
    step: number,
    length: number;
    width?: number;
    label?: RulerLabel | boolean; 
    color?: string;
}