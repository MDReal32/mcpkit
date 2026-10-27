export interface MetaTool {
  name: string;
  description: string;
  inputSchema: Readonly<Record<string, unknown>>;
  annotations?: ToolAnnotations;
}

/** The hints a client uses to group tools: read-only ones apart from the ones that write or delete. */
export interface ToolAnnotations {
  readOnlyHint?: boolean;
  destructiveHint?: boolean;
}
