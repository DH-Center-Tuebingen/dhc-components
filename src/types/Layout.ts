import type { Component } from 'vue';
import { CSS } from './Common';


export type ColumnDefinition = {
    name: string;
    width: number;
    minWidth?: number;
    maxWidth?: number;
    style?: CSS;
}

export interface Node {
    id: string;
    name: string;
    children?: Node[];
}

export type ComponentLike = Component | string;