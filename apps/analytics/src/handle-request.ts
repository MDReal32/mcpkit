import { INCREMENT_USAGE_SQL, MAX_BODY_BYTES } from "./const";
import { parseUsageEvent } from "./parse-usage-event";
import type { WorkerEnv } from "./types";

const respond = (status: number) => new Response(null, { status });

/** Stores a per-day count only; the request IP and headers are never read or kept. */
export const handleRequest = async (request: Request, env: WorkerEnv) => {
  if (request.method !== "POST" || new URL(request.url).pathname !== "/v1/use") {
    return respond(404);
  }
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) {
    return respond(413);
  }
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return respond(400);
  }
  const event = parseUsageEvent(body);
  if (!event) {
    return respond(400);
  }
  const day = new Date().toISOString().slice(0, 10);
  await env.DB.prepare(INCREMENT_USAGE_SQL).bind(day, event.tool, event.version, event.os).run();
  return respond(204);
};
