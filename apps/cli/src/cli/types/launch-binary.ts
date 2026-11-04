export interface LaunchBinary {
  path: string;
  updateHint: string;
  /** Homebrew or winget updates it, so usemcpkit schedules nothing for it. */
  managed: boolean;
}
