export const replacePlaceholder = (path: string, name: string, argName: string) =>
  name === argName ? path : path.replaceAll(`{${name}}`, () => `{${argName}}`);
