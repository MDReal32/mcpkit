import { describeError } from '@mcpkit/core';
import { RPC_ERROR_CODES } from '../const';
import { RpcError } from './rpc-error';

export const parseJsonLine = (line: string) => {
  try {
    const data: unknown = JSON.parse(line);
    return data;
  } catch (error) {
    return new RpcError(RPC_ERROR_CODES.parseError, `parse error: ${describeError(error)}`);
  }
};
