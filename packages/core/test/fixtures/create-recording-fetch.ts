import type { RecordedRequest } from "./recorded-request";

/** Serves JSON per URL like createRouteFetch and records every request it receives. */
export const createRecordingFetch = (routes: Readonly<Record<string, unknown>>) => {
  const requests: RecordedRequest[] = [];
  const recordingFetch: typeof fetch = async (input, init) => {
    const url = input instanceof Request ? input.url : String(input);
    requests.push({ url, headers: new Headers(init?.headers), body: String(init?.body ?? "") });
    const found = url in routes;
    return new Response(JSON.stringify(found ? routes[url] : { message: "Not Found" }), {
      status: found ? 200 : 404,
      headers: { "content-type": "application/json" },
    });
  };
  return { recordingFetch, requests };
};
