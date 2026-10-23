/**
 * A button that takes the token from a local CLI. It runs only when the user clicks it, without a shell,
 * and `args` may use `{domain}` and `{webHost}`.
 */
export interface UiCliAction {
  type: 'cli';
  label: string;
  command: string;
  args: readonly string[];
}
