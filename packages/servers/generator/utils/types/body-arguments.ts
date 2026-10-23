import type { JsonSchema } from "@usemcpkit/core";

export interface BodyArguments {
  /** Outgoing key -> argument name. */
  mapping: Record<string, string>;
  properties: Record<string, JsonSchema>;
  required: string[];
}
