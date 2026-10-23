export interface CatalogServer {
  /** `<category>:<name>`. */
  id: string;
  description?: string;
  tools: readonly string[];
}
