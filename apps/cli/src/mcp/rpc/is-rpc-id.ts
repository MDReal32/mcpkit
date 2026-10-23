import type { RpcId } from '../types/rpc-id';

export const isRpcId = (value: unknown): value is RpcId =>
  value === null || typeof value === 'string' || typeof value === 'number';
