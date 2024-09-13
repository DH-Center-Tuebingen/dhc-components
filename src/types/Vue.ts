export type ArrayClass = string[]
     | Iterable<Record<string, boolean>>
     | (string | Record<string, boolean>)[]

export type Class = string | ArrayClass;
