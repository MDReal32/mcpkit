import { RPC_ERROR_CODES } from '../const';
import { RpcError } from '../rpc/rpc-error';
import type { RpcParams } from '../types/rpc-params';
import type { ToolIndex } from '../types/tool-index';

export const findToolEntry = (tools: ToolIndex, params: RpcParams | undefined) => {
  const name = params?.name;
  const entry = typeof name === 'string' ? tools.get(name) : undefined;
  if (!entry) {
    throw new RpcError(RPC_ERROR_CODES.invalidParams, `unknown tool: ${String(name)}`);
  }
  return entry;
};
