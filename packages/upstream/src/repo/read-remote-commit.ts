import type { UpstreamRepo } from "@usemcpkit/core";
import { UpstreamError } from "../upstream-error";
import { REMOTE_CHECK_TIMEOUT_MS } from "./const";
import { pickRemoteCommit } from "./pick-remote-commit";
import { runProgram } from "./run-program";

/** The commit the remote's copy of the ref points at now. */
export const readRemoteCommit = async (repo: UpstreamRepo, cwd: string) => {
  const output = await runProgram(
    "git",
    ["ls-remote", "--", repo.url, repo.ref, `${repo.ref}^{}`],
    cwd,
    REMOTE_CHECK_TIMEOUT_MS,
  );
  const commit = pickRemoteCommit(output, repo.ref);
  if (!commit) {
    throw new UpstreamError(`${repo.url} has no ref "${repo.ref}"`);
  }
  return commit;
};
