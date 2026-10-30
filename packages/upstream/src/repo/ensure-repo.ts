import type { UpstreamRepo } from "@usemcpkit/core";
import type { RepoOptions } from "../types/repo-options";
import { buildRepo } from "./build-repo";
import { REPO_CHECK_INTERVAL_MS } from "./const";
import { isPinnedCommit } from "./is-pinned-commit";
import { readRepoState } from "./read-repo-state";
import { updateRepo } from "./update-repo";

/**
 * Makes `dir` a finished clone of `repo`. The clone is always used as it is; a clone made for another url, ref or
 * setup is replaced, and one at a branch or tag is compared with the remote once its last check is older than the
 * interval and rebuilt when the ref moved. A commit is pinned and never compared.
 */
export const ensureRepo = async (repo: UpstreamRepo, dir: string, { check, warn }: RepoOptions) => {
  const signature = JSON.stringify(repo);
  const state = await readRepoState(dir);
  if (state?.signature !== signature) {
    await buildRepo(repo, dir, signature, Date.now());
    return;
  }
  if (check && !isPinnedCommit(repo) && Date.now() - state.checkedAt >= REPO_CHECK_INTERVAL_MS) {
    await updateRepo(repo, dir, state, { warn });
  }
};
