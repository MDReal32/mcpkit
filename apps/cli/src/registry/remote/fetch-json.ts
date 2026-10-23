import { FETCH_TIMEOUT_MS } from '../const';

export const fetchJson = async (url: string, fetchImpl: typeof fetch) => {
  const response = await fetchImpl(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!response.ok) {
    throw new Error(`GET ${url} failed: ${response.status}`);
  }
  const body: unknown = await response.json();
  return body;
};
