import type { ServerConfig } from "./server-config";

export interface UsemcpkitConfig {
  version: number;
  servers?: Readonly<Record<string, Readonly<Record<string, ServerConfig>>>>;
}
