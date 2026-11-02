import type { UiSpec } from "../ui/ui-spec";
import type { UpstreamNameRule } from "./upstream-name-rule";
import type { UpstreamRepo } from "./upstream-repo";

/** An MCP server started as a child process and spoken to over its stdio. */
export interface StdioUpstream {
  type: "stdio";
  /** A program name on PATH, never a path. */
  command: string;
  /** May contain `{repo}`, the folder of `repo`'s clone. */
  args?: readonly string[];
  /** Names of credentials handed to the child as environment variables; one missing from the env and the secret store is asked for in the credentials form, saved once the server has started. */
  forwardEnv?: readonly string[];
  /** Names handed to the child when set, in the client's env or the secret store; the upstream decides what a missing one means. */
  optionalEnv?: readonly string[];
  /** The credentials form for `forwardEnv`: `inputs` by env var name and link `actions`. */
  ui?: UiSpec;
  /** When set, the program is run from this repository, cloned and set up on first use. */
  repo?: UpstreamRepo;
  /** How the upstream's tool names become catalog names; tools no rule matches are named `tools:<snake_case>`. */
  naming?: readonly UpstreamNameRule[];
}
