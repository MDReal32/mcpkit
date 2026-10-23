import type { Manifest, ToolSpec } from '@mcpkit/core';

export interface ToolEntry {
  manifest: Manifest;
  tool: ToolSpec;
}
