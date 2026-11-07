export interface CliMethod {
  type: "cli";
  key: string;
  label: string;
  /** Index of the auth option the action belongs to, as the CLI import request names it. */
  option: number;
  /** Index of the action inside that option's actions. */
  action: number;
}
