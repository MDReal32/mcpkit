export interface D1Statement {
  bind: (...values: unknown[]) => { run: () => Promise<unknown> };
}
