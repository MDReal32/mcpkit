import { describeError } from '@usemcpkit/core';
import { EXIT_FAILURE } from './const';
import { printError } from './output/print-error';

/** Adapts a command that resolves to an exit code into a yargs-extended action, printing failures as one line. */
export const toAction =
  <TArgs>(command: (args: TArgs) => Promise<number>) =>
  async (args: TArgs) => {
    try {
      process.exitCode = await command(args);
    } catch (error) {
      printError(`mcpkit: ${describeError(error)}`);
      process.exitCode = EXIT_FAILURE;
    }
  };
