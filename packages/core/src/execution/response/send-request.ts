import type { CallContext } from '../types/call-context';
import type { HttpRequest } from './http-request';

export const sendRequest = (request: HttpRequest, { fetchImpl, timeoutMs }: CallContext) =>
  fetchImpl(request.url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    signal: AbortSignal.timeout(timeoutMs),
  });
