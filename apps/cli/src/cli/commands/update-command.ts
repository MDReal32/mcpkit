import type { Program } from 'yargs-extended';
import { resolveUserDir, updateFromRegistry } from '../../registry';
import { EXIT_FAILURE, EXIT_SUCCESS, REGISTRY_FLAG } from '../const';
import { printError } from '../output/print-error';
import { printLine } from '../output/print-line';
import { toAction } from '../to-action';
import type { UpdateOptions } from '../types/update-options';

export const updateCommand = async (options: UpdateOptions) => {
  const registry = options.registry ?? process.env.MCPKIT_REGISTRY;
  if (!registry) {
    printError(`no registry configured: pass ${REGISTRY_FLAG} <url> or set MCPKIT_REGISTRY`);
    return EXIT_FAILURE;
  }
  const results = await updateFromRegistry(registry);
  for (const result of results) {
    printLine(
      result.status === 'updated'
        ? `updated ${result.name} -> ${result.version}`
        : `rejected ${result.entry}: ${result.errors.join('; ')}`,
    );
  }
  return results.every((result) => result.status === 'updated') ? EXIT_SUCCESS : EXIT_FAILURE;
};

export const registerUpdateCommand = (program: Program) => {
  program
    .command('update', `Download newer manifests into ${resolveUserDir()}`)
    .option('--registry [string]', { description: 'Registry base URL (default: MCPKIT_REGISTRY)' })
    .action(toAction(updateCommand));
};
