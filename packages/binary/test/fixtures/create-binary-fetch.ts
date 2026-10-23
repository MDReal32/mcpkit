/** Serves Uint8Array routes as bytes and everything else as JSON; unknown URLs answer 404. */
export const createBinaryFetch = (routes: Readonly<Record<string, unknown>>) => {
  const binaryFetch: typeof fetch = async (request) => {
    const url = request instanceof Request ? request.url : String(request);
    const body = routes[url];
    if (body === undefined) {
      return new Response("Not Found", { status: 404 });
    }
    return new Response(body instanceof Uint8Array ? body : JSON.stringify(body), { status: 200 });
  };
  return binaryFetch;
};
