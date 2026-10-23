import type { Manifest, ToolSpec } from '@usemcpkit/core';

export interface ToolEntry {
  manifest: Manifest;
  tool: ToolSpec;
}
