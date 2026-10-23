import { RPC_ERROR_CODES } from '../const';
import { RpcError } from '../rpc/rpc-error';
import type { RpcParams } from '../types/rpc-params';
import { readToolArguments } from './read-tool-arguments';

export const readStringArgument = (params: RpcParams | undefined, key: string) => {
  const value = readToolArguments(params)?.[key];
  if (typeof value !== 'string' || value === '') {
    throw new RpcError(RPC_ERROR_CODES.invalidParams, `argument "${key}" must be a non-empty string`);
  }
  return value;
};
