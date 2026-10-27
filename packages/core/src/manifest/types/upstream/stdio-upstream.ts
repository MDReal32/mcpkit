/** An MCP server started as a child process and spoken to over its stdio. */
export interface StdioUpstream {
  type: "stdio";
  /** A program name on PATH, never a path. */
  command: string;
  args?: readonly string[];
  /** Names of credentials (the manifest's `auth` env names) handed to the child as environment variables. */
  forwardEnv?: readonly string[];
}
