export interface OperationNames {
  group: string;
  /** Kebab-case folder under the group. */
  resourceFolder: string;
  /** Kebab-case file name, without extension. */
  actionFile: string;
  /** Snake-case tool name: `<group>:<resource>:<action>`. */
  name: string;
  identifier: string;
}
