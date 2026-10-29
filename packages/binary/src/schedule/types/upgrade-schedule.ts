/** What the scheduled job runs: `<binaryPath> upgrade`, its output appended to `logPath`. */
export interface UpgradeSchedule {
  binaryPath: string;
  logPath: string;
}
