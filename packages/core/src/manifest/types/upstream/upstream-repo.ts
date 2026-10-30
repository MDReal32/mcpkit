import type { RepoSetupStep } from "./repo-setup-step";

/** A git repository the upstream server is run from, cloned on first use into `~/.mcpkit/repos/<category>/<name>`. */
export interface UpstreamRepo {
  url: string;
  /**
   * Commit, tag or branch to check out. A commit is pinned and never compared; a tag or branch is compared with the
   * remote on use and the clone rebuilt when it moved. The checkout is run as code, so pin a commit unless you trust the ref.
   */
  ref: string;
  /** Run in order in the clone once, after checkout, with no credentials in the environment. */
  setup?: readonly RepoSetupStep[];
}
