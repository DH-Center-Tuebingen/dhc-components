export type ThesaurusConcept = {
    id: number,
    thesaurus_url?: string,
    concept_url?: string,
};

export type ReducedThesaurusConcept = {
    id: number,
    label: string,
};

export type toLabelFunction = (concept: ThesaurusConcept) => ReducedThesaurusConcept['label'];