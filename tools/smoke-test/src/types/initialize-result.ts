import type { ServerInfo } from "./server-info";

export interface InitializeResult {
  protocolVersion: string;
  serverInfo: ServerInfo;
}
