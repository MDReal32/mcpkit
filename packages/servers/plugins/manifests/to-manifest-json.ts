/** Round-trips through JSON so validation sees exactly what will be shipped. */
export const toManifestJson = (definition: unknown) => `${JSON.stringify(definition ?? null, null, 2)}\n`;
