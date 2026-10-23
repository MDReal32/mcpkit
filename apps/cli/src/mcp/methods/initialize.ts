import { VERSION } from "../../version";
import { DEFAULT_PROTOCOL_VERSION, SERVER_NAME } from "../const";
import type { RpcParams } from "../types/rpc-params";

export const initialize = (params: RpcParams | undefined) => {
  const requested = params?.protocolVersion;
  return {
    protocolVersion: typeof requested === "string" ? requested : DEFAULT_PROTOCOL_VERSION,
    capabilities: { tools: { listChanged: true } },
    serverInfo: { name: SERVER_NAME, version: VERSION },
  };
};
