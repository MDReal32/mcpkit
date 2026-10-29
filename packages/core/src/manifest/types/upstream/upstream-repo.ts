import type { RepoSetupStep } from "./repo-setup-step";

/** A git repository the upstream server is run from, cloned on first use into `~/.mcpkit/repos/<category>/<name>`. */
export interface UpstreamRepo {
  url: string;
  /** Tag or commit to check out; pin a commit, since the checkout is run as code. */
  ref: string;
  /** Run in order in the clone once, after checkout, with no credentials in the environment. */
  setup?: readonly RepoSetupStep[];
}
