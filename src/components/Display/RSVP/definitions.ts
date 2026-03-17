export interface RSVPProps {
    content: string,
    wordsPerMinute?: number,
    highlightOrp?: boolean,
    loop?: boolean,
}

export interface WordParts {
    before: string | undefined,
    orp: string | undefined, // Optimal Recognition Point
    after: string | undefined,
}