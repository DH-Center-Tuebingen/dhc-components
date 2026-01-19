export const only = (object: Object, allows: Array<any> = []) => {
    return Object.keys(object)
        .filter(key => allows.includes(key))
        .reduce((obj, key) => {
            return {
                ...obj,
                [key]: object[key]
            };
        }, {});
};