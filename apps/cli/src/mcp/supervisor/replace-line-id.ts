import { isJsonObject } from "@usemcpkit/core";
import { parseJsonLine } from "../rpc/parse-json-line";

export const replaceLineId = (line: string, id: string) => {
  const data = parseJsonLine(line);
  if (!isJsonObject(data)) {
    throw new Error("cannot replay a handshake line that is not a JSON object");
  }
  return JSON.stringify({ ...data, id });
};
