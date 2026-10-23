import { describeAuth } from '@usemcpkit/core';
import type { Program } from 'yargs-extended';
import { EXIT_SUCCESS } from '../const';
import { printLine } from '../output/print-line';
import { loadReportedManifests } from '../serve/load-reported-manifests';
import { toAction } from '../to-action';

export const listCommand = async () => {
  for (const manifest of (await loadReportedManifests()).values()) {
    printLine(`${manifest.name} ${manifest.version} (${describeAuth(manifest.auth)}) — ${manifest.description ?? ''}`);
    for (const tool of manifest.tools) {
      printLine(`  ${manifest.name}_${tool.name}: ${tool.description}`);
    }
  }
  return EXIT_SUCCESS;
};

export const registerListCommand = (program: Program) => {
  program.command('list', 'List available servers and their tools').action(toAction(listCommand));
};
