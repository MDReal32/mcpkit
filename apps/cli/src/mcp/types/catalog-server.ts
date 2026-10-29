export interface CatalogServer {
  /** `<category>:<name>`. */
  id: string;
  description?: string;
  /** Set for a server backed by another MCP server: its tools are discovered when it is first opened. */
  upstream?: boolean;
}
