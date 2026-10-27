import type { Manifest } from "../../../manifest";
import { isDomainValue } from "../../../manifest";
import { AuthError } from "../../auth-error";
import { listKnownHosts } from "../../config/list-known-hosts";
import { loadConfig } from "../../config/load-config";
import { pickRemoteHost } from "../../project/pick-remote-host";
import { resolveProject } from "../../project/resolve-project";
import type { AuthContext } from "../../types/auth-context";

/**
 * The host of a call, in this order: its env var; the host this project was bound to; the known host the project's
 * git remote points at (when the manifest asks for it); the only host in use, or else the last used one when no project
 * is known, or the manifest default. With several hosts and no way to tell, it is undefined so the form asks.
 */
export const resolveDomain = async (manifest: Manifest, context: AuthContext) => {
  const { domain } = manifest;
  if (!domain) {
    return undefined;
  }
  const fromEnv = domain.env ? context.env[domain.env] : undefined;
  const saved = fromEnv ? undefined : await resolveSavedDomain(manifest, context);
  if (saved === null) {
    return undefined;
  }
  const value = fromEnv || saved || domain.default;
  if (value !== undefined && !isDomainValue(value)) {
    throw new AuthError(`${manifest.name}: domain "${value}" must look like host[:port][/path]`);
  }
  return value;
};

/** Null when several hosts are known and nothing says which one this project uses. */
const resolveSavedDomain = async (manifest: Manifest, context: AuthContext) => {
  const server = (await loadConfig(context.env)).servers?.[manifest.name];
  const knownHosts = listKnownHosts(server);
  if (context.projectDir === undefined || knownHosts.length === 0) {
    return server?.domain;
  }
  const project = await resolveProject(context.projectDir);
  const bound = server?.projects?.[project.key];
  if (bound) {
    return bound;
  }
  const remote =
    manifest.domain?.matchGitRemote && project.remoteHost ? pickRemoteHost(knownHosts, project.remoteHost) : undefined;
  if (remote) {
    return remote;
  }
  return knownHosts.length === 1 ? knownHosts[0] : null;
};
