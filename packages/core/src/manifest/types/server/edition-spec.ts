/** A deployment of the same API that needs other requests, for example Atlassian Cloud next to Data Center. */
export interface EditionSpec {
  label?: string;
  /** Host suffixes such as `.atlassian.net`; a domain whose host ends with one of them uses this edition. */
  hosts: readonly string[];
}
