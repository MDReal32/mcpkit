import { createBinaryContext, resolveInstalledBinaryPath } from '@mcpkit/binary';
import { createClientContext, detectClients, removeClientEntry } from '@mcpkit/clients';
import type { Program } from 'yargs-extended';
import { applyToClients } from '../clients/apply-to-clients';
import { selectClients } from '../clients/select-clients';
import { EXIT_FAILURE, EXIT_SUCCESS } from '../const';
import { printLine } from '../output/print-line';
import { toAction } from '../to-action';
import type { ClientSelection } from '../types/client-selection';

/** Removes the `mcpkit` entry from the chosen clients. The binary stays so other clients keep working. */
export const uninstallCommand = async (selection: ClientSelection) => {
  const detected = await detectClients(createClientContext());
  const candidates = detected.filter((client) => client.hasEntry || client.problem);
  if (candidates.length === 0) {
    printLine('No client has an mcpkit entry.');
    return EXIT_SUCCESS;
  }
  const selected = await selectClients(candidates, selection, 'uninstall');
  if (!selected || selected.length === 0) {
    printLine('Nothing selected, nothing changed.');
    return EXIT_SUCCESS;
  }
  const failed = await applyToClients(selected, (client) => removeClientEntry(client.definition, client.configPath));
  const context = await createBinaryContext();
  printLine(`The binary stays at ${resolveInstalledBinaryPath(context.target, context.env)}; delete it if unused.`);
  return failed === 0 ? EXIT_SUCCESS : EXIT_FAILURE;
};

export const registerUninstallCommand = (program: Program) => {
  program
    .command('uninstall', 'Remove the mcpkit entry from clients')
    .option('--all', { description: 'Every client with an mcpkit entry, no questions', default: false })
    .option('--clients [string]', { description: 'Only these clients, comma-separated ids' })
    .action(toAction(uninstallCommand));
};
