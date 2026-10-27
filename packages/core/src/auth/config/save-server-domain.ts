import type { Env } from "../../env";
import { updateServerConfig } from "./update-server-config";

/** Remembers the host as the last one used, makes it a known host and, with a project, binds the project to it. */
export const saveServerDomain = (env: Env, serverName: string, domain: string, projectKey?: string) =>
  updateServerConfig(env, serverName, (current) => ({
    ...current,
    domain,
    hosts: { ...current.hosts, [domain]: { ...current.hosts?.[domain] } },
    ...(projectKey === undefined ? {} : { projects: { ...current.projects, [projectKey]: domain } }),
  }));
