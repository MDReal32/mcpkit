import type { RpcId } from "../types/rpc-id";
import type { RpcResponse } from "../types/rpc-response";

export const createResultResponse = (id: RpcId, result: unknown) => {
  const response: RpcResponse = { jsonrpc: "2.0", id, result };
  return response;
};
