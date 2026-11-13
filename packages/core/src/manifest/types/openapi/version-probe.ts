/** A GET to `path` of the server, with the user's credentials, whose JSON `field` holds the version. */
export interface VersionProbe {
  path: string;
  /** Dotted path into the JSON answer, for example `installed_version`. */
  field: string;
  /** Regex whose first capture is the version, for example `^(\d+\.\d+)` for `3.14.2`. */
  match: string;
}
