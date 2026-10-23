import type { Worker } from "./types/worker";

export const awaitHandshake = async (worker: Worker, timeoutMs: number) => {
  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`no initialize response within ${timeoutMs} ms`)), timeoutMs);
  });
  const exited = worker.exited.then((code) => {
    throw new Error(`the new server exited with code ${code} before answering initialize`);
  });
  try {
    return await Promise.race([worker.handshakeResponse, exited, timeout]);
  } finally {
    clearTimeout(timer);
  }
};
