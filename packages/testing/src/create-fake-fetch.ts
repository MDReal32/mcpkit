/** Always answers with the given status and body; JSON bodies get a JSON content-type. */
export const createFakeFetch = (status: number, body: unknown) => {
  const isText = typeof body === 'string';
  const fakeFetch: typeof fetch = async () =>
    new Response(isText ? body : JSON.stringify(body), {
      status,
      headers: { 'content-type': isText ? 'text/plain' : 'application/json' },
    });
  return fakeFetch;
};
