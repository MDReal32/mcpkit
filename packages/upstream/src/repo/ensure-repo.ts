import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { UpstreamRepo } from "@usemcpkit/core";
import { READY_MARKER_FILE_NAME } from "./const";
import { readReadyMarker } from "./read-ready-marker";
import { runProgram } from "./run-program";

/**
 * Makes `dir` a finished clone of `repo`: cloned, checked out at the pinned ref and set up. It is built next to `dir`
 * and moved into place at the end, so a failed or interrupted run leaves nothing half-made, and a clone made for
 * another url, ref or setup is replaced. Nothing runs when the marker of the finished clone already matches.
 */
export const ensureRepo = async (repo: UpstreamRepo, dir: string) => {
  const signature = JSON.stringify(repo);
  if ((await readReadyMarker(dir)) === signature) {
    return;
  }
  const staging = `${dir}.tmp-${process.pid}`;
  await mkdir(dirname(dir), { recursive: true });
  await rm(staging, { recursive: true, force: true });
  try {
    await runProgram("git", ["clone", "--quiet", "--no-checkout", "--", repo.url, staging], dirname(dir));
    await runProgram("git", ["checkout", "--quiet", "--detach", repo.ref, "--"], staging);
    for (const step of repo.setup ?? []) {
      await runProgram(step.command, step.args ?? [], staging);
    }
    await writeFile(join(staging, READY_MARKER_FILE_NAME), signature);
    if ((await readReadyMarker(dir)) !== signature) {
      await rm(dir, { recursive: true, force: true });
      await rename(staging, dir);
    }
  } finally {
    await rm(staging, { recursive: true, force: true });
  }
};
