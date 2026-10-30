import type { StdioUpstream } from "@usemcpkit/core";
import type { RepoOptions } from "../types/repo-options";
import { UpstreamError } from "../upstream-error";
import { REPO_DIR_PLACEHOLDER } from "./const";
import { ensureRepo } from "./ensure-repo";

/**
 * A stdio upstream that names a `repo` is cloned and set up under `repoDir` the first time it is needed and kept
 * up to date after that; the result runs the program with `{repo}` in its args replaced by that folder. A spec
 * without a repo is returned as it is.
 */
export const prepareRepo = async (spec: StdioUpstream, repoDir: string | undefined, options: RepoOptions) => {
  const { repo, ...program } = spec;
  if (!repo) {
    return spec;
  }
  if (!repoDir) {
    throw new UpstreamError(`"${spec.command}" runs from a repository but no folder was given to clone it into`);
  }
  await ensureRepo(repo, repoDir, options);
  const prepared: StdioUpstream = {
    ...program,
    args: program.args?.map((arg) => arg.replaceAll(REPO_DIR_PLACEHOLDER, repoDir)),
  };
  return prepared;
};
