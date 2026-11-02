import { isJsonObject } from "@usemcpkit/core";
import { parseJsonLine } from "../rpc/parse-json-line";

/** What the wire log keeps of one JSON-RPC line: its size, method and id, and the client's name on `initialize`. */
export const describeWireLine = (line: string) => {
  const details: Record<string, unknown> = { bytes: Buffer.byteLength(line) };
  const data = parseJsonLine(line);
  if (!isJsonObject(data)) {
    details.parsed = false;
    return details;
  }
  if (data.id !== undefined) {
    details.id = data.id;
  }
  if (typeof data.method === "string") {
    details.method = data.method;
  }
  if (isJsonObject(data.params) && isJsonObject(data.params.clientInfo)) {
    details.client = data.params.clientInfo.name;
  }
  if (isJsonObject(data.params) && typeof data.params.name === "string") {
    details.tool = data.params.name;
  }
  if (data.error !== undefined) {
    details.error = true;
  }
  return details;
};
