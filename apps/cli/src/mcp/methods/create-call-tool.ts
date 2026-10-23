import type { ExecuteOptions } from '@usemcpkit/core';
import { isJsonObject } from '@usemcpkit/core';
import { RPC_ERROR_CODES } from '../const';
import { callServerTool } from '../handlers/call-server-tool';
import { describeTool } from '../handlers/describe-tool';
import { listServerTools } from '../handlers/list-server-tools';
import { listServers } from '../handlers/list-servers';
import { RpcError } from '../rpc/rpc-error';
import { CALL_TOOL_TOOL, DESCRIBE_TOOL_TOOL, LIST_SERVERS_TOOL, LIST_TOOLS_TOOL } from '../tools/const';
import { readStringArgument } from '../tools/read-string-argument';
import { readToolArguments } from '../tools/read-tool-arguments';
import type { Catalog } from '../types/catalog';
import type { RpcParams } from '../types/rpc-params';

const readNestedArguments = (params: RpcParams | undefined) => {
  const nested = readToolArguments(params)?.arguments;
  if (nested === undefined) {
    return undefined;
  }
  if (!isJsonObject(nested)) {
    throw new RpcError(RPC_ERROR_CODES.invalidParams, '"arguments" must be an object');
  }
  return nested;
};

export const createCallTool = (catalog: Catalog, options: ExecuteOptions) => async (params: RpcParams | undefined) => {
  switch (params?.name) {
    case LIST_SERVERS_TOOL:
      return listServers(catalog);
    case LIST_TOOLS_TOOL:
      return listServerTools(catalog, readStringArgument(params, 'server'));
    case DESCRIBE_TOOL_TOOL:
      return describeTool(catalog, readStringArgument(params, 'id'));
    case CALL_TOOL_TOOL:
      return callServerTool(catalog, readStringArgument(params, 'id'), readNestedArguments(params), options);
    default:
      throw new RpcError(RPC_ERROR_CODES.invalidParams, `unknown tool: ${String(params?.name)}`);
  }
};
