import { FETCH_TIMEOUT_MS } from "../const";

export const fetchText = async (url: string, fetchImpl: typeof fetch, timeoutMs = FETCH_TIMEOUT_MS) => {
  const response = await fetchImpl(url, { signal: AbortSignal.timeout(timeoutMs) });
  if (!response.ok) {
    throw new Error(`GET ${url} failed: ${response.status}`);
  }
  return response.text();
};
