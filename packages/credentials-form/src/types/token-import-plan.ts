import type { CliTokenCommand } from '@mcpkit/core';

export interface TokenImportPlan {
  cli: CliTokenCommand;
  option: number;
  /** The field the imported token fills. */
  key: string;
  domain?: string;
}
