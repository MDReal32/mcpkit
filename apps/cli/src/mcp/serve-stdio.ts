import { createInterface } from 'node:readline';
import type { ExecuteOptions, Manifest } from '@mcpkit/core';
import { createRpcHandler } from './rpc/create-rpc-handler';
import { handleLine } from './rpc/handle-line';
import type { StdioOptions } from './types/stdio-options';

/** Serves newline-delimited JSON-RPC until input closes; stdout carries protocol messages only. */
export const serveStdio = (
  manifests: ReadonlyMap<string, Manifest>,
  { input = process.stdin, output = process.stdout }: StdioOptions = {},
  options: ExecuteOptions = {},
) => {
  const handler = createRpcHandler(manifests, options);
  const lines = createInterface({ input, crlfDelay: Infinity });
  lines.on('line', (line) => {
    void handleLine(line, handler).then((response) => {
      if (response) {
        output.write(`${JSON.stringify(response)}\n`);
      }
    });
  });
  return new Promise<void>((resolve) => {
    lines.once('close', resolve);
  });
};
