import { isCompiledBinary } from '@mcpkit/binary';
import type { Program } from 'yargs-extended';
import { serveStdio } from '../../mcp';
import { VERSION } from '../../version';
import { EXIT_FAILURE, EXIT_SUCCESS } from '../const';
import { printError } from '../output/print-error';
import { createServeOptions } from '../serve/create-serve-options';
import { loadReportedManifests } from '../serve/load-reported-manifests';
import { serveSupervised } from '../serve/serve-supervised';
import { toAction } from '../to-action';
import type { ServeOptions } from '../types/serve-options';

export const serveCommand = async (options: ServeOptions) => {
  const names = options.servers ?? [];
  if (isCompiledBinary() && !options.worker) {
    return serveSupervised(names);
  }
  const available = await loadReportedManifests();
  const unknown = names.filter((name) => !available.has(name));
  if (unknown.length > 0) {
    printError(`unknown server(s): ${unknown.join(', ')}. Available: ${[...available.keys()].join(', ')}`);
    return EXIT_FAILURE;
  }
  const selected = names.length > 0 ? new Map([...available].filter(([name]) => names.includes(name))) : available;
  printError(`mcpkit ${VERSION}: serving ${[...selected.keys()].join(', ')}`);
  await serveStdio(selected, {}, createServeOptions());
  return EXIT_SUCCESS;
};

export const registerServeCommand = (program: Program) => {
  program
    .command('serve', 'Run an MCP server over stdio (all servers if none given)')
    .positional('...[servers: string[]]', { description: 'Server names, for example github jira' })
    .option('--worker', { description: 'Internal: run as the worker of a supervising serve', default: false })
    .action(toAction(serveCommand));
};
