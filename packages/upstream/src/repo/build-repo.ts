import { mkdir, rm } from "node:fs/promises";
import { dirname } from "node:path";
import type { UpstreamRepo } from "@usemcpkit/core";
import { readRepoState } from "./read-repo-state";
import { replaceDirectory } from "./replace-directory";
import { runProgram } from "./run-program";
import { writeRepoState } from "./write-repo-state";

/**
 * Clones `repo`, checks out its ref, sets it up and records the commit it resolved to. It is built next to `dir`
 * and moved into place at the end, so a failed or interrupted run leaves nothing half-made; a clone another process
 * finished at the same commit meanwhile is kept.
 */
export const buildRepo = async (repo: UpstreamRepo, dir: string, signature: string, now: number) => {
  const staging = `${dir}.tmp-${process.pid}`;
  const previous = `${dir}.old-${process.pid}`;
  await mkdir(dirname(dir), { recursive: true });
  await rm(staging, { recursive: true, force: true });
  try {
    await runProgram("git", ["clone", "--quiet", "--no-checkout", "--", repo.url, staging], dirname(dir));
    await runProgram("git", ["checkout", "--quiet", "--detach", repo.ref, "--"], staging);
    const commit = await runProgram("git", ["rev-parse", "HEAD"], staging);
    for (const step of repo.setup ?? []) {
      await runProgram(step.command, step.args ?? [], staging);
    }
    await writeRepoState(staging, { signature, commit, updatedAt: now, checkedAt: now });
    const current = await readRepoState(dir);
    if (current?.signature !== signature || current.commit !== commit) {
      await replaceDirectory(dir, staging, previous);
    }
  } finally {
    await rm(staging, { recursive: true, force: true });
    await rm(previous, { recursive: true, force: true });
  }
};
