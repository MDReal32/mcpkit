import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach } from 'vitest';

/** Creates a fresh temp dir per test; read it through the returned getter. */
export const useTempDir = (prefix: string) => {
  const state = { dir: '' };
  beforeEach(async () => {
    state.dir = await mkdtemp(join(tmpdir(), prefix));
  });
  afterEach(async () => {
    await rm(state.dir, { recursive: true, force: true });
  });
  return () => state.dir;
};
