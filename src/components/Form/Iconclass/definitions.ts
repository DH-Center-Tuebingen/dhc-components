import { baseAttributeProps } from '../Attribute/definitions';

export type iconclassObject = {
    kw: Record<string, Array<string>>,
    txt: Record<string, string>,
};

export interface IconclassProps extends baseAttributeProps {
    defaultValue: string,
    metadata: {language: string},
}
