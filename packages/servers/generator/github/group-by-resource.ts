import type { GeneratedTool } from './types/generated-tool.ts';

export const groupByResource = (tools: GeneratedTool[]) => {
  const groups = new Map<string, GeneratedTool[]>();
  for (const tool of tools) {
    groups.set(tool.resourceFolder, [...(groups.get(tool.resourceFolder) ?? []), tool]);
  }
  return groups;
};
