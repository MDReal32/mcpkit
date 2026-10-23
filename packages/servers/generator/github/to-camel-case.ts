export const toCamelCase = (path: string) =>
  path.replace(/[-/]([a-z0-9])/g, (_match, letter: string) => letter.toUpperCase());
