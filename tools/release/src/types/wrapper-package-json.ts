/** The fields of the npx wrapper's `package.json` this tool reads or writes; the others are kept as they are. */
export interface WrapperPackageJson {
  name: string;
  version: string;
  optionalDependencies?: Record<string, string>;
  [field: string]: unknown;
}
