/** The source a checked host belongs to and the version its server runs (absent for a source without versions). */
export interface HostCheckResult {
  source: string;
  label: string;
  version?: string;
}
