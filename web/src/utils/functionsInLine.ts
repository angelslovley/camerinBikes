export const callInLine = (...rest: Function[]) => rest.forEach(func => func?.())