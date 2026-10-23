import { createTokenCheckingFetch } from './create-token-checking-fetch';

/** createTokenCheckingFetch that also records the host of every API request. */
export const createHostCheckingFetch = (validToken: string, tokenRoutes: Readonly<Record<string, unknown>> = {}) => {
  const { tokenCheckingFetch, sentAuthorizations } = createTokenCheckingFetch(validToken, tokenRoutes);
  const sentHosts: string[] = [];
  const hostCheckingFetch: typeof fetch = async (input, init) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    if (!(url.toString() in tokenRoutes)) {
      sentHosts.push(url.host);
    }
    return tokenCheckingFetch(input, init);
  };
  return { hostCheckingFetch, sentAuthorizations, sentHosts };
};
