export interface ReleaseTarget {
  /** `linux-x64`, `windows-x64`, …: the `@usemcpkit/cli-<name>` package and the release asset suffix. */
  name: string;
  /** npm's `os` field. */
  os: string;
  /** npm's `cpu` field. */
  cpu: string;
  /** npm's `libc` field, on Linux only. */
  libc?: string;
}
