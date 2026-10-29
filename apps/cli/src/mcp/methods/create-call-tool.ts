import { describeError } from "@usemcpkit/core";
import { RPC_ERROR_CODES } from "../const";
import type { ToolExposure } from "../exposed";
import { callServerTool } from "../handlers/call-server-tool";
import { RpcError } from "../rpc/rpc-error";
import { createTextResult } from "../tools/create-text-result";
import { createToolId } from "../tools/create-tool-id";
import { readToolArguments } from "../tools/read-tool-arguments";
import type { Catalog } from "../types/catalog";
import type { McpOptions } from "../types/mcp-options";
import type { RpcParams } from "../types/rpc-params";

export const createCallTool =
  (catalog: Catalog, exposure: ToolExposure, options: McpOptions) => async (params: RpcParams | undefined) => {
    const found = exposure.find(String(params?.name));
    if (!found) {
      throw new RpcError(
        RPC_ERROR_CODES.invalidParams,
        `unknown tool: ${String(params?.name)}; open its section first, the tool list shows the sections`,
      );
    }
    if (found.kind === "section") {
      try {
        return createTextResult(await exposure.open(found));
      } catch (error) {
        return createTextResult(`could not open ${found.name}: ${describeError(error)}`, true);
      }
    }
    return callServerTool(catalog, createToolId(found.serverId, found.tool), readToolArguments(params), options);
  };
