import type { ClientDefinition } from "./client-definition";

export interface DetectedClient {
  definition: ClientDefinition;
  configPath: string;
  hasEntry: boolean;
  /** Why the config file could not be read; such a client is shown but cannot be changed. */
  problem?: string;
}
