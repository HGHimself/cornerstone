export const objectToQueryParams = ( obj ) => Object.keys(obj)
    .reduce(( acc, key ) => `${acc}${key}=${obj[key]}&`, "")
    .slice(0,-1);
