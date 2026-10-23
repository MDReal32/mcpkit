import type { RpcHandler } from '../types/rpc-handler';
import { createErrorResponse } from './create-error-response';
import { parseRpcMessage } from './parse-rpc-message';
import { RpcError } from './rpc-error';

export const handleLine = async (line: string, handler: RpcHandler) => {
  if (!line.trim()) {
    return null;
  }
  const message = parseRpcMessage(line);
  if (message instanceof RpcError) {
    return createErrorResponse(null, message);
  }
  return handler(message);
};
