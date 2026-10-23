/**
 * Serves `tokenRoutes` as JSON; every other request gets 200 only for `Authorization: Bearer <validToken>`
 * and 401 otherwise. Records the Authorization header of every API request.
 */
export const createTokenCheckingFetch = (validToken: string, tokenRoutes: Readonly<Record<string, unknown>> = {}) => {
  const sentAuthorizations: string[] = [];
  const tokenCheckingFetch: typeof fetch = async (input, init) => {
    const url = input instanceof Request ? input.url : String(input);
    if (url in tokenRoutes) {
      return Response.json(tokenRoutes[url]);
    }
    const authorization = new Headers(init?.headers).get("authorization") ?? "";
    sentAuthorizations.push(authorization);
    const accepted = authorization === `Bearer ${validToken}`;
    return Response.json(accepted ? { pong: true } : { message: "Bad credentials" }, { status: accepted ? 200 : 401 });
  };
  return { tokenCheckingFetch, sentAuthorizations };
};
