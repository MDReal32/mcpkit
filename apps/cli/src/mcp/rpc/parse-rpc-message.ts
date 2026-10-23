import { isJsonObject } from '@usemcpkit/core';
import { RPC_ERROR_CODES } from '../const';
import type { RpcMessage } from '../types/rpc-message';
import { isRpcId } from './is-rpc-id';
import { parseJsonLine } from './parse-json-line';
import { RpcError } from './rpc-error';

/** Validates one untrusted stdio line; returns the RpcError to report instead of throwing. */
export const parseRpcMessage = (line: string) => {
  const data = parseJsonLine(line);
  if (data instanceof RpcError) {
    return data;
  }
  if (!isJsonObject(data) || typeof data.method !== 'string') {
    return new RpcError(RPC_ERROR_CODES.invalidRequest, 'invalid request: expected an object with a string "method"');
  }
  if (data.id !== undefined && !isRpcId(data.id)) {
    return new RpcError(RPC_ERROR_CODES.invalidRequest, 'invalid request: "id" must be a string, number or null');
  }
  if (data.params !== undefined && !isJsonObject(data.params)) {
    return new RpcError(RPC_ERROR_CODES.invalidRequest, 'invalid request: "params" must be an object');
  }
  const message: RpcMessage = { id: data.id, method: data.method, params: data.params };
  return message;
};
