import { createClientContext, detectClients, pathExists, SERVE_ARGS, setClientEntry } from '@usemcpkit/clients';
import type { Program } from 'yargs-extended';
import { applyToClients } from '../clients/apply-to-clients';
import { selectClients } from '../clients/select-clients';
import { BINARY_FLAG, EXIT_FAILURE, EXIT_SUCCESS } from '../const';
import { printDetectedClientsMissing } from '../output/print-detected-clients-missing';
import { printError } from '../output/print-error';
import { printLine } from '../output/print-line';
import { toAction } from '../to-action';
import type { InstallOptions } from '../types/install-options';
import { prepareLaunchBinary } from '../update/prepare-launch-binary';

/** Copies the binary to ~/.mcpkit/bin (or uses the Homebrew/winget one in place) and points each chosen client's single `mcpkit` entry at it. */
export const installCommand = async (options: InstallOptions) => {
  const binaryPath = options.binary;
  if (binaryPath !== undefined && !(await pathExists(binaryPath))) {
    printError(`${BINARY_FLAG} ${binaryPath}: no such file`);
    return EXIT_FAILURE;
  }
  const detected = await detectClients(createClientContext());
  if (detected.length === 0) {
    printDetectedClientsMissing();
    return EXIT_FAILURE;
  }
  const selected = await selectClients(detected, options, 'install');
  if (!selected || selected.length === 0) {
    printLine('Nothing selected, nothing changed.');
    return EXIT_SUCCESS;
  }
  const binary = await prepareLaunchBinary(binaryPath);
  const failed = await applyToClients(selected, (client) =>
    setClientEntry(client.definition, client.configPath, { command: binary.path, args: SERVE_ARGS }),
  );
  printLine(`Restart the clients to load mcpkit. ${binary.updateHint}`);
  return failed === 0 ? EXIT_SUCCESS : EXIT_FAILURE;
};

export const registerInstallCommand = (program: Program) => {
  program
    .command('install', 'Add mcpkit to the AI clients found on this computer (asks which)')
    .addAlias('$0')
    .option('--all', { description: 'Every detected client, no questions', default: false })
    .option('--clients [string]', { description: 'Only these clients, comma-separated ids' })
    .option('--binary [path]', { description: 'Install this mcpkit binary instead of downloading one' })
    .action(toAction(installCommand));
};
