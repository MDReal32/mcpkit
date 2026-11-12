import type { AuthSpec } from "../auth/auth-spec";
import type { UpstreamNameRule } from "./upstream-name-rule";

/** An MCP server reached over Streamable HTTP; its own `auth` signs the requests, the manifest's when it has none. */
export interface HttpUpstream {
  type: "http";
  /** May contain `{domain}`. */
  url: string;
  /** Tried like the manifest's `auth`; set when the manifest has tools of its own that sign in differently. */
  auth?: readonly AuthSpec[];
  /** How the upstream's tool names become catalog names; tools no rule matches are named `tools:<snake_case>`. */
  naming?: readonly UpstreamNameRule[];
}
