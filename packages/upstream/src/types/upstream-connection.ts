import type { UpstreamResult } from "./upstream-result";
import type { UpstreamTool } from "./upstream-tool";

export interface UpstreamConnection {
  listTools: () => Promise<UpstreamTool[]>;
  callTool: (name: string, args?: Readonly<Record<string, unknown>>) => Promise<UpstreamResult>;
  close: () => Promise<void>;
}
