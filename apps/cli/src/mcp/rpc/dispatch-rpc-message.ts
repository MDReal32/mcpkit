import { describeError } from '@mcpkit/core';
import { RPC_ERROR_CODES } from '../const';
import type { RpcMessage } from '../types/rpc-message';
import type { RpcMethod } from '../types/rpc-method';
import { createErrorResponse } from './create-error-response';
import { createResultResponse } from './create-result-response';
import { RpcError } from './rpc-error';

export const dispatchRpcMessage = async (methods: ReadonlyMap<string, RpcMethod>, message: RpcMessage) => {
  const id = message.id ?? null;
  const method = methods.get(message.method);
  if (!method) {
    return createErrorResponse(id, new RpcError(RPC_ERROR_CODES.methodNotFound, `method not found: ${message.method}`));
  }
  try {
    return createResultResponse(id, await method(message.params));
  } catch (error) {
    const rpcError =
      error instanceof RpcError ? error : new RpcError(RPC_ERROR_CODES.internalError, describeError(error));
    return createErrorResponse(id, rpcError);
  }
};
