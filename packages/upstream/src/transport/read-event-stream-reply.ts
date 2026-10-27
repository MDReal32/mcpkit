import type { JsonRpcMessage } from "../types/json-rpc-message";
import { UpstreamError } from "../upstream-error";

const readEventData = (event: string) =>
  event
    .split("\n")
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice("data:".length).trimStart())
    .join("\n");

/** The JSON-RPC reply to `id` inside a text/event-stream body; other events (notifications, requests) are skipped. */
export const readEventStreamReply = (body: string, id: number) => {
  for (const event of body.replaceAll("\r\n", "\n").split("\n\n")) {
    const data = readEventData(event);
    if (data === "") {
      continue;
    }
    try {
      const message = JSON.parse(data) as JsonRpcMessage;
      if (message.id === id) {
        return message;
      }
    } catch {}
  }
  throw new UpstreamError("the event stream ended without a reply");
};
