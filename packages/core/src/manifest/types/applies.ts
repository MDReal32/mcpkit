/**
 * Where a hand-written tool or an auth entry of an OpenAPI manifest applies: a tool replaces the built tool of the same
 * name there, and the credentials form offers an auth entry only there.
 */
export interface Applies {
  /** Names of the OpenAPI sources; every source when absent. */
  sources?: readonly string[];
  /**
   * The versions, as a condition on `{version}`: `9.0 <= {version} < 10`, or `{version} >= 9.0 && {version} < 10`
   * (operators `<`, `<=`, `>`, `>=`, `==`, `!=`); every version when absent.
   */
  if?: string;
}
