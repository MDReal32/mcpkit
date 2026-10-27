export interface MetaTool {
  name: string;
  description: string;
  inputSchema: Readonly<Record<string, unknown>>;
}
