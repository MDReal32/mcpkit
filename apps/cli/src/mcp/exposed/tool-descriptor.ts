export interface ToolDescriptor {
  tool: string;
  description: string;
  inputSchema: Readonly<Record<string, unknown>>;
}
