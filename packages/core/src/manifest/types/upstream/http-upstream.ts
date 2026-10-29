import type { UpstreamNameRule } from "./upstream-name-rule";
/** An MCP server reached over Streamable HTTP; the manifest's `auth` signs the requests. */
export interface HttpUpstream {
  type: "http";
  /** May contain `{domain}`. */
  url: string;
  /** How the upstream's tool names become catalog names; tools no rule matches are named `tools:<snake_case>`. */
  naming?: readonly UpstreamNameRule[];
}
