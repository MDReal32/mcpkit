import type { Catalog } from "../types/catalog";
import type { McpOptions } from "../types/mcp-options";
import type { RpcMethod } from "../types/rpc-method";
import { createCallTool } from "./create-call-tool";
import { createListTools } from "./create-list-tools";
import { initialize } from "./initialize";
import { ping } from "./ping";

export const createRpcMethods = (catalog: Catalog, options: McpOptions) =>
  new Map<string, RpcMethod>([
    ["initialize", initialize],
    ["ping", ping],
    ["tools/list", createListTools(catalog, options)],
    ["tools/call", createCallTool(catalog, options)],
  ]);
