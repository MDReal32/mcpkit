/** Calls a function the CLI's native window bound into the page; false when the page is in a browser and it is absent. */
export const callWindowBinding = (name: string, ...args: unknown[]) => {
  const binding: unknown = Reflect.get(window, name);
  if (typeof binding !== "function") {
    return false;
  }
  binding(...args);
  return true;
};
