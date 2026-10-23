import type { RpcMessage } from './rpc-message';
import type { RpcResponse } from './rpc-response';

export type RpcHandler = (message: RpcMessage) => Promise<RpcResponse | null>;
