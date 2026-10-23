import type { ExecuteOptions } from '@usemcpkit/core';
import type { RpcMethod } from '../types/rpc-method';
import type { ToolIndex } from '../types/tool-index';
import { createCallTool } from './create-call-tool';
import { createListTools } from './create-list-tools';
import { initialize } from './initialize';
import { ping } from './ping';

export const createRpcMethods = (tools: ToolIndex, options: ExecuteOptions) =>
  new Map<string, RpcMethod>([
    ['initialize', initialize],
    ['ping', ping],
    ['tools/list', createListTools(tools)],
    ['tools/call', createCallTool(tools, options)],
  ]);
