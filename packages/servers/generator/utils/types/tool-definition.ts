import type { ToolSpec } from "@usemcpkit/core";

export type ToolDefinition = Pick<ToolSpec, "name" | "description" | "input" | "request" | "response" | "editions">;
