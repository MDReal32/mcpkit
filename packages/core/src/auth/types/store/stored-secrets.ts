/** Saved credentials and domains as plain text, by server name and then key. */
export type StoredSecrets = Readonly<Record<string, Readonly<Record<string, string>>>>;
