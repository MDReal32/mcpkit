export interface ServerOutput {
  serverName: string;
  serverDescription: string;
  /** Tool groups in the order the generated index lists them. */
  groups: string[];
  groupArraySuffix: string;
}
