import type { RpcParams } from './rpc-params';

export type RpcMethod = (params: RpcParams | undefined) => unknown;
