import type { Program } from 'yargs-extended';
import { resolveUserDir, syncManifests } from '../../registry';
import { EXIT_FAILURE, EXIT_SUCCESS } from '../const';
import { describeUpdateResult } from '../output/describe-update-result';
import { printLine } from '../output/print-line';
import { toAction } from '../to-action';
import type { UpdateOptions } from '../types/update-options';

export const updateCommand = async (options: UpdateOptions) => {
  const results = await syncManifests(options.registry);
  for (const result of results) {
    printLine(describeUpdateResult(result));
  }
  return results.every((result) => result.status !== 'rejected') ? EXIT_SUCCESS : EXIT_FAILURE;
};

export const registerUpdateCommand = (program: Program) => {
  program
    .command('update', `Download newer manifests into ${resolveUserDir()}`)
    .option('--registry [string]', {
      description: 'Registry base URL (default: MCPKIT_REGISTRY, else the mcpkit registry)',
    })
    .action(toAction(updateCommand));
};
