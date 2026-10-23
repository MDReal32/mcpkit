/** Serves each URL from the route table as JSON, 404 otherwise. */
export const createRouteFetch = (routes: Readonly<Record<string, unknown>>) => {
  const routeFetch: typeof fetch = async (request) => {
    const url = request instanceof Request ? request.url : String(request);
    const found = url in routes;
    return new Response(JSON.stringify(found ? routes[url] : { message: 'Not Found' }), {
      status: found ? 200 : 404,
      headers: { 'content-type': 'application/json' },
    });
  };
  return routeFetch;
};
