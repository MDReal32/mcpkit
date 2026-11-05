import type { ServerInfo } from "./server-info.ts";

export interface InitializeResult {
  protocolVersion: string;
  serverInfo: ServerInfo;
}
