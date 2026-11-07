import type { WorkerEnv } from "../types";
import { parseUsageEvent } from "../usage";
import { INCREMENT_USAGE_SQL, MAX_BODY_BYTES, USAGE_PATH } from "./const";
import { respond } from "./respond";

/** Stores one overall count per tool; the request IP and headers are never read or kept. */
export const handleRequest = async (request: Request, env: WorkerEnv) => {
  if (request.method !== "POST" || new URL(request.url).pathname !== USAGE_PATH) {
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
  await env.DB.prepare(INCREMENT_USAGE_SQL).bind(event.tool).run();
  return respond(204);
};
