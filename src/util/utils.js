export const isNullOrUndefined = (obj) => {
    return (obj === null || obj === undefined);
}

export const scrollElemIntoView = (elemId) => {
    document.getElementById(elemId).scrollIntoView({ behavior: "smooth" });
}