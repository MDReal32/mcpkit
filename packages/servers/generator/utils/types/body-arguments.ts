import type { JsonSchema } from "@usemcpkit/core";

export interface BodyArguments {
  /** Outgoing key -> argument name. */
  mapping: Record<string, string>;
  properties: Record<string, JsonSchema>;
  required: string[];
  contentType: string;
  fileArgs: string[];
  /** Set when the body has no named properties: the argument sent unchanged as the whole body. */
  wholeBody?: string;
}
