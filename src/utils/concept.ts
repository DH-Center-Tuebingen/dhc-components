import {
    ReducedThesaurusConcept,
    ThesaurusConcept,
    toLabelFunction,
} from '../types/Concept';

export const unify = (concept: ThesaurusConcept, labelTranslator: toLabelFunction): ReducedThesaurusConcept => {
    const translatedLabel = labelTranslator(concept);
    return {
        id: concept.id,
        label: translatedLabel,
    };
}

export const unifyAll = (concepts: Array<ThesaurusConcept>, labelTranslator: toLabelFunction): Array<ReducedThesaurusConcept> => {
    return concepts.map(concept => unify(concept, labelTranslator));
}