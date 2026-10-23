import type { RpcErrorBody } from "./rpc-error-body";
import type { RpcId } from "./rpc-id";

export interface RpcResponse {
  jsonrpc: "2.0";
  id: RpcId;
  result?: unknown;
  error?: RpcErrorBody;
}
