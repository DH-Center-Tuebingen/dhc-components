import { CSS } from './Common';


export type ColumnDefinition = {
    name: string;
    width: number;
    minWidth?: number;
    maxWidth?: number;
    style?: CSS;
}