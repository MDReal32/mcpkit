/** A port a program wrote to its own log when it started listening. */
export interface LogPortSource {
  type: "log";
  /**
   * Glob patterns of the log files, a leading `~/` meaning the user's home; the file changed last that has a match is
   * read.
   */
  files: readonly string[];
  /** A regular expression whose first capture group is the port; the last match in the file wins. */
  pattern: string;
}
