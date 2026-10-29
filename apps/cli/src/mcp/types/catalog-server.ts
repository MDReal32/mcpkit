export interface CatalogServer {
  /** `<category>:<name>`. */
  id: string;
  description?: string;
  /** Only for a server whose tools are discovered live (upstream); the tools of the others are found by opening it. */
  tools?: readonly string[];
}
