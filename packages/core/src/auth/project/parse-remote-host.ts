const SCP_LIKE_REMOTE = /^(?:[^@/]+@)?([^:/]+):(?!\/\/)/;

/** The host of a git remote URL (https, ssh or scp-like `git@host:path`), lowercase and without a port. */
export const parseRemoteHost = (remote: string) => {
  if (remote.includes("://")) {
    try {
      return new URL(remote).hostname.toLowerCase() || undefined;
    } catch {
      return undefined;
    }
  }
  return SCP_LIKE_REMOTE.exec(remote)?.[1]?.toLowerCase();
};
