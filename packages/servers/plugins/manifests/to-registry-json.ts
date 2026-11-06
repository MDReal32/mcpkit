/**
 * Every file the registry ships is minified JSON, and its sha256 is taken over exactly this text; the CLI formats what
 * it caches. Round-trips through JSON so validation sees exactly what will be shipped.
 */
export const toRegistryJson = (value: unknown) => JSON.stringify(value ?? null);
