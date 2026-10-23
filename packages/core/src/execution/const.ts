import type { ResolvedAuth } from '../auth';

export const DEFAULT_TIMEOUT_MS = 30_000;

export const HTTP_UNAUTHORIZED = 401;

export const NO_AUTH: ResolvedAuth = { headers: {}, query: {} };
