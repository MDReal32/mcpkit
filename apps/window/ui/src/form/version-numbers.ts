/** The numbers of a version, in order (`10.3.27-ee` → 10, 3, 27). */
export const versionNumbers = (version: string) =>
  version
    .split(/\D+/)
    .filter((part) => part !== "")
    .map(Number);
