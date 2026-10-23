import type { Manifest } from '@usemcpkit/core';
import type { ToolEntry } from '../types/tool-entry';
import type { ToolIndex } from '../types/tool-index';

export const buildToolIndex = (manifests: ReadonlyMap<string, Manifest>) => {
  const entries = [...manifests.values()].flatMap((manifest) =>
    manifest.tools.map((tool) => {
      const entry: ToolEntry = { manifest, tool };
      return [`${manifest.name}_${tool.name}`, entry] as const;
    }),
  );
  const index: ToolIndex = new Map(entries);
  return index;
};
