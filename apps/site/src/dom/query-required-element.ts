/** Finds the one element a script needs and checks its type; a page without it is a build mistake, so this throws. */
export const queryRequiredElement = <T extends Element>(selector: string, type: new () => T) => {
  const element = document.querySelector(selector);
  if (!(element instanceof type)) {
    throw new Error(`the page has no ${type.name} matching ${selector}`);
  }
  return element;
};
