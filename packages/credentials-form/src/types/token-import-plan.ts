import type { CliTokenCommand } from '@usemcpkit/core';

export interface TokenImportPlan {
  cli: CliTokenCommand;
  option: number;
  /** The field the imported token fills. */
  key: string;
  domain?: string;
}
