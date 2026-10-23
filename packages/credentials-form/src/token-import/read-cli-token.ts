import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type { CliTokenCommand } from '@mcpkit/core';
import { describeError } from '@mcpkit/core';
import { CLI_TOKEN_TIMEOUT_MS } from '../const';
import { readCommandFailure } from './read-command-failure';

const execFileAsync = promisify(execFile);

/** Runs the provider's CLI without a shell and returns the token it prints. */
export const readCliToken = async (cli: CliTokenCommand) => {
  let stdout: string;
  try {
    ({ stdout } = await execFileAsync(cli.command, [...cli.args], { timeout: CLI_TOKEN_TIMEOUT_MS }));
  } catch (error) {
    throw new Error(`${cli.command}: ${readCommandFailure(cli, error) ?? describeError(error)}`);
  }
  const token = stdout.trim();
  if (!token) {
    throw new Error(`${cli.command} printed no token`);
  }
  return token;
};
