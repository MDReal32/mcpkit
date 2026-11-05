export interface BuildCopy {
  /** A project's build folder, relative to the workspace root. */
  from: string;
  /** Where it lands, relative to the collected build folder. */
  to: string;
}
