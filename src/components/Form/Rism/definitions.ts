import { baseAttributeProps } from '../Attribute/definitions';

export type rismObject = {
    id: string,
    typeLabel: Record<string, Array<string>>,
    label: Record<string, Array<string>>,
    sourceTypes: {
        recordType: {
            type: string,
            label: Record<string, Array<string>>,
        },
        sourceType: {
            type: string,
            label: Record<string, Array<string>>,
        },
        contentTypes: [
            {
                type: string,
                label: Record<string, Array<string>>,
            }
        ],
    },
};

export interface RismProps extends baseAttributeProps {
    defaultValue: string,
    metadata: {language: string},
}
