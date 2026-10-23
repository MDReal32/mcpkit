export const toArgumentName = (name: string) => name.replace(/[^A-Za-z0-9_]+/g, "_").replace(/^_+|_+$/g, "");
