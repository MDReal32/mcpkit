/** An MCP server reached over Streamable HTTP; the manifest's `auth` signs the requests. */
export interface HttpUpstream {
  type: "http";
  /** May contain `{domain}`. */
  url: string;
}
