import type { ExecuteOptions } from "@usemcpkit/core";
import { createRpcMethods } from "../methods/create-rpc-methods";
import type { Catalog } from "../types/catalog";
import type { RpcHandler } from "../types/rpc-handler";
import { dispatchRpcMessage } from "./dispatch-rpc-message";

/** Maps one JSON-RPC message to its response, or null for notifications. */
export const createRpcHandler = (catalog: Catalog, options: ExecuteOptions = {}) => {
  const methods = createRpcMethods(catalog, options);
  const handler: RpcHandler = async (message) => {
    const response = await dispatchRpcMessage(methods, message);
    return message.id === undefined ? null : response;
  };
  return handler;
};
