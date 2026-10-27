export interface McpTransport {
  request: (method: string, params?: Readonly<Record<string, unknown>>) => Promise<unknown>;
  notify: (method: string, params?: Readonly<Record<string, unknown>>) => Promise<void>;
  close: () => Promise<void>;
}
