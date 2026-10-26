import type { D1Statement } from "./d1-statement";

export interface D1Database {
  prepare: (query: string) => D1Statement;
}
