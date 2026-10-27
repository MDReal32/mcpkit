export interface McpTransport {
  request: (method: string, params?: Readonly<Record<string, unknown>>) => Promise<unknown>;
  notify: (method: string, params?: Readonly<Record<string, unknown>>) => Promise<void>;
  /** False once the channel is gone (a stdio child exited); an HTTP upstream has none to lose. */
  isOpen: () => boolean;
  close: () => Promise<void>;
}
