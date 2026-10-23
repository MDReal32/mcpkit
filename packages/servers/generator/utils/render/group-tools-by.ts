import type { GeneratedTool } from "../types/generated-tool";

export const groupToolsBy = <Key extends string>(tools: GeneratedTool[], keyOf: (tool: GeneratedTool) => Key) => {
  const groups = new Map<Key, GeneratedTool[]>();
  for (const tool of tools) {
    const key = keyOf(tool);
    groups.set(key, [...(groups.get(key) ?? []), tool]);
  }
  return groups;
};
