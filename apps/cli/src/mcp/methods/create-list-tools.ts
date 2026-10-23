import type { ToolIndex } from '../types/tool-index';

export const createListTools = (tools: ToolIndex) => () => ({
  tools: [...tools].map(([name, { manifest, tool }]) => ({
    name,
    description: `[${manifest.name}] ${tool.description}`,
    inputSchema: tool.input,
  })),
});
