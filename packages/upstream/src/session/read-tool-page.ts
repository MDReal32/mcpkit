import type { UpstreamTool } from "../types/upstream-tool";

export interface ToolPage {
  tools: UpstreamTool[];
  nextCursor?: string;
}

export const readToolPage = (result: unknown) => {
  const page = (result ?? {}) as Partial<ToolPage>;
  return { tools: Array.isArray(page.tools) ? page.tools : [], nextCursor: page.nextCursor } satisfies ToolPage;
};
