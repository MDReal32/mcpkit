import { toWebHost } from "../ui/to-web-host";

const toHostname = (domain: string) => (domain.split("/")[0] ?? domain).split(":")[0]?.toLowerCase();

/** The known host a git remote host points at: `github.com` picks `api.github.com`, a self-managed host picks itself. */
export const pickRemoteHost = (knownHosts: readonly string[], remoteHost: string) =>
  knownHosts.find((host) => toHostname(host) === remoteHost || toHostname(toWebHost(host)) === remoteHost);
