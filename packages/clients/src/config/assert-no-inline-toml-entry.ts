/** An entry written as an inline table cannot be edited line by line; ask for a manual edit instead. */
export const assertNoInlineTomlEntry = (text: string, serversPath: readonly string[], name: string, path: string) => {
  const inline = new RegExp(`^\\s*(?:${serversPath.join('\\.')}\\.)?${name}\\s*=\\s*\\{`, 'm');
  if (inline.test(text)) {
    throw new Error(`${path}: "${name}" is defined as an inline table; remove it by hand and run again`);
  }
};
