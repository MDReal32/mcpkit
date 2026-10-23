import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { describeError } from '@usemcpkit/core';
import { printError } from '../../cli/output/print-error';
import { HANDSHAKE_REQUEST_ID } from './const';
import { readLineHeader } from './read-line-header';
import type { Worker } from './types/worker';
import type { WorkerLaunch } from './types/worker-launch';

/** Starts `launch`; every line it prints goes to `onLine`, except the answer to the replayed initialize. */
export const spawnWorker = (launch: WorkerLaunch, onLine: (line: string) => void) => {
  const child = spawn(launch.command, [...launch.args], { stdio: ['pipe', 'pipe', 'inherit'] });
  let answerHandshake: (line: string) => void = () => undefined;
  const handshakeResponse = new Promise<string>((resolve) => {
    answerHandshake = resolve;
  });
  const exited = new Promise<number>((resolve) => {
    child.once('close', (code) => resolve(code ?? 1));
    child.once('error', (error) => {
      printError(`mcpkit: cannot run ${launch.command}: ${describeError(error)}`);
      resolve(1);
    });
  });
  child.stdin.on('error', (error) => {
    printError(`mcpkit: cannot write to the server process: ${describeError(error)}`);
  });
  createInterface({ input: child.stdout }).on('line', (line) => {
    if (readLineHeader(line).id === HANDSHAKE_REQUEST_ID) {
      answerHandshake(line);
      return;
    }
    onLine(line);
  });
  const worker: Worker = {
    send: (line) => {
      child.stdin.write(`${line}\n`);
    },
    finish: () => {
      child.stdin.end();
    },
    kill: () => {
      child.kill();
    },
    handshakeResponse,
    exited,
  };
  return worker;
};
