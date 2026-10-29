import { createExposedToolsLoader } from "../exposed";
import type { Catalog } from "../types/catalog";
import type { McpOptions } from "../types/mcp-options";
import type { RpcMethod } from "../types/rpc-method";
import { createCallTool } from "./create-call-tool";
import { createListTools } from "./create-list-tools";
import { initialize } from "./initialize";
import { ping } from "./ping";

export const createRpcMethods = (catalog: Catalog, options: McpOptions) => {
  const loadTools = createExposedToolsLoader(catalog, options);
  return new Map<string, RpcMethod>([
    ["initialize", initialize],
    ["ping", ping],
    ["tools/list", createListTools(loadTools)],
    ["tools/call", createCallTool(catalog, loadTools, options)],
  ]);
};
