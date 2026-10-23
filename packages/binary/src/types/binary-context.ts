import type { Env } from "@usemcpkit/core";
import type { Target } from "../platform";

export interface BinaryContext {
  target: Target;
  env: Env;
  fetchImpl: typeof fetch;
}
