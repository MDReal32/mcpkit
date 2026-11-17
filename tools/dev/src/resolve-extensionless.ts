import type { ResolveHook } from "node:module";

const RELATIVE_PREFIX = ".";

const MISSING_MODULE_CODE = "ERR_MODULE_NOT_FOUND";

/** Node resolves a relative import only with its extension, so a missing one is retried as a `.ts` file. */
export const resolve: ResolveHook = async (specifier, context, nextResolve) => {
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    const isMissing = error instanceof Error && "code" in error && error.code === MISSING_MODULE_CODE;
    if (!isMissing || !specifier.startsWith(RELATIVE_PREFIX)) {
      throw error;
    }
    return nextResolve(`${specifier}.ts`, context);
  }
};
