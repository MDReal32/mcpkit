/** Renames the tools of an upstream server into mcpkit's `<group>:<resource>:<action>` form. */
export interface UpstreamNameRule {
  /** A regular expression tested against the upstream tool name; the first rule that matches names the tool. */
  match: string;
  /** The new name, with `$1`… for captures and `$&` for the whole upstream name: `org:members:$&`. */
  name: string;
}
