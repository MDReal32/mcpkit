import type { JsonRpcError } from "./json-rpc-error.ts";

export interface JsonRpcMessage<Result = unknown> {
  jsonrpc: "2.0";
  id?: number;
  method?: string;
  params?: unknown;
  result?: Result;
  error?: JsonRpcError;
}
