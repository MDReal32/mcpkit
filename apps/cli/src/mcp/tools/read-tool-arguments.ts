import { isJsonObject } from "@usemcpkit/core";
import { RPC_ERROR_CODES } from "../const";
import { RpcError } from "../rpc/rpc-error";
import type { RpcParams } from "../types/rpc-params";

export const readToolArguments = (params: RpcParams | undefined) => {
  const args = params?.arguments;
  if (args === undefined) {
    return undefined;
  }
  if (!isJsonObject(args)) {
    throw new RpcError(RPC_ERROR_CODES.invalidParams, "tool arguments must be an object");
  }
  return args;
};
