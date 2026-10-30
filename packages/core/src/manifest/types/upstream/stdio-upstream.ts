import type { UpstreamNameRule } from "./upstream-name-rule";
import type { UpstreamRepo } from "./upstream-repo";

/** An MCP server started as a child process and spoken to over its stdio. */
export interface StdioUpstream {
  type: "stdio";
  /** A program name on PATH, never a path. */
  command: string;
  /** May contain `{repo}`, the folder of `repo`'s clone. */
  args?: readonly string[];
  /** Names of credentials (the manifest's `auth` env names) handed to the child as environment variables; a missing one is an error. */
  forwardEnv?: readonly string[];
  /** Names handed to the child when set, in the client's env or the secret store; the upstream decides what a missing one means. */
  optionalEnv?: readonly string[];
  /** When set, the program is run from this repository, cloned and set up on first use. */
  repo?: UpstreamRepo;
  /** How the upstream's tool names become catalog names; tools no rule matches are named `tools:<snake_case>`. */
  naming?: readonly UpstreamNameRule[];
}
