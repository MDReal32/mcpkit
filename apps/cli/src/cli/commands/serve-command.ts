import { isCompiledBinary } from '@usemcpkit/binary';
import type { Program } from 'yargs-extended';
import { serveStdio } from '../../mcp';
import { VERSION } from '../../version';
import { EXIT_SUCCESS } from '../const';
import { printError } from '../output/print-error';
import { createServeOptions } from '../serve/create-serve-options';
import { loadCatalog } from '../serve/load-catalog';
import { serveSupervised } from '../serve/serve-supervised';
import { toAction } from '../to-action';
import type { ServeOptions } from '../types/serve-options';

export const serveCommand = async (options: ServeOptions) => {
  const names = options.servers ?? [];
  if (isCompiledBinary() && !options.worker) {
    return serveSupervised(names);
  }
  const catalog = await loadCatalog(names);
  printError(`mcpkit ${VERSION}: serving ${catalog.servers.map((server) => server.id).join(', ')}`);
  await serveStdio(catalog, {}, createServeOptions());
  return EXIT_SUCCESS;
};

export const registerServeCommand = (program: Program) => {
  program
    .command('serve', 'Run an MCP server over stdio (all servers if none given)')
    .positional('...[servers: string[]]', { description: 'Server ids or names, for example git:github or jira' })
    .option('--worker', { description: 'Internal: run as the worker of a supervising serve', default: false })
    .action(toAction(serveCommand));
};
