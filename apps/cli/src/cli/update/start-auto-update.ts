import { isCompiledBinary } from '@usemcpkit/binary';
import { describeError } from '@usemcpkit/core';
import { printError } from '../output/print-error';
import { runAutoUpdate } from './run-auto-update';

/** Fire-and-forget: a failed update check is logged to stderr and never affects serving. */
export const startAutoUpdate = () => {
  if (!isCompiledBinary()) {
    return;
  }
  runAutoUpdate().catch((error: unknown) => {
    printError(`mcpkit: update check failed: ${describeError(error)}`);
  });
};
