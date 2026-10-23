import type { DetectedClient } from '@usemcpkit/clients';
import { describeError } from '@usemcpkit/core';
import { printError } from '../output/print-error';
import { printLine } from '../output/print-line';
import { toDisplayPath } from '../output/to-display-path';
import type { ClientAction } from '../types/client-action';

/** Runs the action per client, reporting each outcome; one failing client does not stop the others. */
export const applyToClients = async (clients: readonly DetectedClient[], action: ClientAction) => {
  let failed = 0;
  for (const client of clients) {
    try {
      await action(client);
      printLine(`  ✓ ${client.definition.name}  ${toDisplayPath(client.configPath)}`);
    } catch (error) {
      failed++;
      printError(`  ✗ ${client.definition.name}: ${describeError(error)}`);
    }
  }
  return failed;
};
