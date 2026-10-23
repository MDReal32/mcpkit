import type { ExecuteOptions } from "@usemcpkit/core";
import type { Catalog } from "../types/catalog";
import type { RpcMethod } from "../types/rpc-method";
import { createCallTool } from "./create-call-tool";
import { listTools } from "./create-list-tools";
import { initialize } from "./initialize";
import { ping } from "./ping";

export const createRpcMethods = (catalog: Catalog, options: ExecuteOptions) =>
  new Map<string, RpcMethod>([
    ["initialize", initialize],
    ["ping", ping],
    ["tools/list", listTools],
    ["tools/call", createCallTool(catalog, options)],
  ]);
