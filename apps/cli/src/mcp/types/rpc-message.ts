import type { RpcId } from './rpc-id';
import type { RpcParams } from './rpc-params';

/** A message without an id is a notification and gets no response. */
export interface RpcMessage {
  id?: RpcId;
  method: string;
  params?: RpcParams;
}
