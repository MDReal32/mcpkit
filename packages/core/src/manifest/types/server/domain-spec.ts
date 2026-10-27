/** Lets one server talk to any host of the same API, for example a self-hosted GitHub Enterprise. */
export interface DomainSpec {
  /** Shown next to the domain field of the credentials form. */
  label?: string;
  /** Shown under the domain field. */
  hint?: string;
  placeholder?: string;
  default?: string;
  /** Env var that sets the domain; when it is set the form does not ask for one. */
  env?: string;
  /** Picks the saved host the git remote of the working directory points at, so a repository needs no question. */
  matchGitRemote?: boolean;
}
