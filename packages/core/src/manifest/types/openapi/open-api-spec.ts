import type { OpenApiSource } from "./open-api-source";

/**
 * Tools built on the user's machine from OpenAPI (or Swagger 2.0) documents, for the version the user's server runs.
 * A tool is named after its endpoint, `<path>:<method>` (`repos/{owner}/{repo}/branches:get`); a hand-written tool of
 * the same name replaces it.
 */
export interface OpenApiSpec {
  /**
   * The documents of each deployment: every source whose `hosts` match the domain is used, their tools merged in order;
   * when none does, every source without `hosts`.
   */
  sources: readonly OpenApiSource[];
}
