
// When we draft an object before it gets saved in the database, we don't have an id yet.
// But when we fetch the object from the database, it will have an id.
// This type is used to 
export type Draft<T> = Omit<T, 'id'>;

export type WithId<T> = T & { id: number };

export type Timestamps = {
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
};