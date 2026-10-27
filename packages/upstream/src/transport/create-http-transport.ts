import type { HttpUpstream } from "@usemcpkit/core";
import { MCP_PROTOCOL_VERSION, PROTOCOL_HEADER, REQUEST_TIMEOUT_MS, SESSION_HEADER } from "../const";
import type { JsonRpcMessage } from "../types/json-rpc-message";
import type { McpTransport } from "../types/mcp-transport";
import type { UpstreamOptions } from "../types/upstream-options";
import { UpstreamError } from "../upstream-error";
import { readEventStreamReply } from "./read-event-stream-reply";

export const createHttpTransport = ({ url }: HttpUpstream, { headers, fetchImpl = fetch }: UpstreamOptions) => {
  let sessionId: string | undefined;
  let nextId = 1;
  const post = async (message: Readonly<Record<string, unknown>>) => {
    const response = await fetchImpl(url, {
      method: "POST",
      headers: {
        ...headers,
        Accept: "application/json, text/event-stream",
        "Content-Type": "application/json",
        [PROTOCOL_HEADER]: MCP_PROTOCOL_VERSION,
        ...(sessionId ? { [SESSION_HEADER]: sessionId } : {}),
      },
      body: JSON.stringify({ jsonrpc: "2.0", ...message }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    sessionId = response.headers.get(SESSION_HEADER) ?? sessionId;
    if (!response.ok) {
      throw new UpstreamError(`${url} answered ${response.status}`);
    }
    return response;
  };
  const readReply = async (response: Response, id: number) => {
    const text = await response.text();
    const isEventStream = (response.headers.get("content-type") ?? "").includes("text/event-stream");
    const message: JsonRpcMessage = isEventStream ? readEventStreamReply(text, id) : JSON.parse(text);
    if (message.error) {
      throw new UpstreamError(message.error.message);
    }
    return message.result;
  };
  const transport: McpTransport = {
    request: async (method, params) => {
      const id = nextId;
      nextId += 1;
      return readReply(await post({ id, method, params }), id);
    },
    notify: async (method, params) => {
      await post({ method, params });
    },
    close: async () => {
      if (!sessionId) {
        return;
      }
      await fetchImpl(url, { method: "DELETE", headers: { ...headers, [SESSION_HEADER]: sessionId } }).catch(
        () => undefined,
      );
    },
  };
  return transport;
};
