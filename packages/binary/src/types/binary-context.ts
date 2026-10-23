import type { Env } from '@mcpkit/core';
import type { Target } from '../platform';

export interface BinaryContext {
  target: Target;
  env: Env;
  fetchImpl: typeof fetch;
}
