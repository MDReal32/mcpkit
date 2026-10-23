import type { RpcId } from '../types/rpc-id';
import type { RpcResponse } from '../types/rpc-response';
import type { RpcError } from './rpc-error';

export const createErrorResponse = (id: RpcId, { code, message }: RpcError) => {
  const response: RpcResponse = { jsonrpc: '2.0', id, error: { code, message } };
  return response;
};
