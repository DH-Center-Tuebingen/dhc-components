import { ReducedThesaurusConcept } from 'src/types/Concept';
import { baseAttributeProps } from '../Attribute/definitions';

export interface SeparatorProps extends baseAttributeProps {
    defaultValue: ReducedThesaurusConcept,
}
