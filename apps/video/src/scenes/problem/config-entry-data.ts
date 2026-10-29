export interface ConfigEntryData {
  name: string;
  command: string;
  args: readonly string[];
  env?: string;
}
