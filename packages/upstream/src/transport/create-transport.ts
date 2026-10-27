import type { UpstreamSpec } from "@usemcpkit/core";
import type { UpstreamOptions } from "../types/upstream-options";
import { createHttpTransport } from "./create-http-transport";
import { createStdioTransport } from "./create-stdio-transport";

export const createTransport = (spec: UpstreamSpec, options: UpstreamOptions) =>
  spec.type === "http" ? createHttpTransport(spec, options) : createStdioTransport(spec, options);
