export interface D1Statement {
  bind: (...values: unknown[]) => { run: () => Promise<unknown> };
}

export interface D1Database {
  prepare: (query: string) => D1Statement;
}

export interface WorkerEnv {
  DB: D1Database;
}

export interface UsageEvent {
  tool: string;
  version: string;
  os: string;
}
