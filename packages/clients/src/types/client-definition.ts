import type { ClientContext } from "./client-context";
import type { ConfigFormat } from "./config-format";
import type { LaunchCommand } from "./launch-command";

export interface ClientDefinition {
  id: string;
  name: string;
  format: ConfigFormat;
  /** Paths whose existence means the client is installed for this user. */
  detectPaths: (context: ClientContext) => readonly string[];
  configPath: (context: ClientContext) => string;
  /** Path of the object that maps server names to entries, e.g. `['mcpServers']`. */
  serversPath: readonly string[];
  createEntry: (launch: LaunchCommand) => Record<string, unknown>;
}
