import { RPC_ERROR_CODES } from "../const";
import { callServerTool } from "../handlers/call-server-tool";
import { RpcError } from "../rpc/rpc-error";
import { createToolId } from "../tools/create-tool-id";
import { readToolArguments } from "../tools/read-tool-arguments";
import type { Catalog } from "../types/catalog";
import type { ExposedToolsLoader } from "../types/exposed-tools-loader";
import type { McpOptions } from "../types/mcp-options";
import type { RpcParams } from "../types/rpc-params";

export const createCallTool =
  (catalog: Catalog, loadTools: ExposedToolsLoader, options: McpOptions) => async (params: RpcParams | undefined) => {
    const found = (await loadTools()).find((candidate) => candidate.name === params?.name);
    if (!found) {
      throw new RpcError(RPC_ERROR_CODES.invalidParams, `unknown tool: ${String(params?.name)}`);
    }
    return callServerTool(catalog, createToolId(found.serverId, found.tool), readToolArguments(params), options);
  };
