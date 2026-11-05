/** Resolves `specifier`, or undefined when no such module is installed; any other failure is thrown. */
export const tryResolveModule = (require: NodeJS.Require, specifier: string) => {
  try {
    return require.resolve(specifier);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "MODULE_NOT_FOUND") {
      return undefined;
    }
    throw error;
  }
};
