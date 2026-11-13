/**
 * Where a hand-written tool or an auth entry of an OpenAPI manifest applies: a tool replaces the built tool of the same
 * name there, and the credentials form offers an auth entry only there.
 */
export interface Applies {
  /** Names of the OpenAPI sources; every source when absent. */
  sources?: readonly string[];
  /** The first version it applies to. */
  from?: string;
  /** The first version it no longer applies to. */
  below?: string;
}
