export interface ToolLookupFailure {
  error: string;
}

export interface ToolLookupHit {
  serverId: string;
  tool: string;
}

export type ToolLookup = ToolLookupFailure | ToolLookupHit;
