import type { UpstreamRepo } from "@usemcpkit/core";
import { describeError } from "@usemcpkit/core";
import type { RepoOptions } from "../types/repo-options";
import type { RepoState } from "../types/repo-state";
import { buildRepo } from "./build-repo";
import { readRemoteCommit } from "./read-remote-commit";
import { writeRepoState } from "./write-repo-state";

/**
 * Compares the commit the clone was built at with the remote's current one and builds the clone again when they
 * differ. The check is marked before it starts, and a remote that cannot be reached or a build that fails keeps the
 * clone it has, so the cache keeps serving and the next try is one interval away.
 */
export const updateRepo = async (
  repo: UpstreamRepo,
  dir: string,
  state: RepoState,
  { warn }: Pick<RepoOptions, "warn">,
) => {
  await writeRepoState(dir, { ...state, checkedAt: Date.now() });
  try {
    const remote = await readRemoteCommit(repo, dir);
    if (remote !== state.commit) {
      await buildRepo(repo, dir, state.signature, Date.now());
    }
  } catch (error) {
    warn(`mcpkit: could not update ${repo.url} at ${repo.ref}, using the clone it has: ${describeError(error)}`);
  }
};
