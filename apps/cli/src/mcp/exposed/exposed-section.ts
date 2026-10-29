import type { ToolAnnotations } from "../types/tool-definition";

/**
 * A server or one of its groups, listed like a tool so the model can open it: calling it takes no arguments, lists what
 * is inside and puts the tools of a group into the tool list. It is not a tool of the server itself.
 */
export interface ExposedSection {
  kind: "section";
  name: string;
  serverId: string;
  /** Set for a group of a server split into parts; unset for the server itself. */
  group?: string;
  description: string;
  inputSchema: Readonly<Record<string, unknown>>;
  annotations: ToolAnnotations;
}
