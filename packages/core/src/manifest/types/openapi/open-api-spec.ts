import type { OpenApiSource } from "./open-api-source";

/** Tools built on the user's machine from an OpenAPI (or Swagger 2.0) document, for the version the user's server runs. */
export interface OpenApiSpec {
  /** One document per deployment; the first whose `hosts` match the domain is used, one without `hosts` matches any. */
  sources: readonly OpenApiSource[];
  /**
   * Ordered `"regex": "template"` rules over `"METHOD /path"` (`GET /repos/{owner}/{repo}/branches`) that name the
   * tools, `$1…` being the captures; an endpoint no rule matches gets a name made from its path.
   */
  naming?: Readonly<Record<string, string>>;
}
