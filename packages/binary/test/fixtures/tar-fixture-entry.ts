export interface TarFixtureEntry {
  path: string;
  content: string;
  /** Directory part stored in the ustar prefix field instead of the name. */
  prefix?: string;
}
