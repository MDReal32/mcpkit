/** A command that prints a token on stdout; run without a shell. */
export interface CliTokenCommand {
  command: string;
  args: readonly string[];
}
