import type { Env } from "../../env";
import type { ServerKey } from "../types/server-key";
import { updateServerConfig } from "./update-server-config";

/** Makes the host a known host and, with a project, binds the project to it. */
export const saveServerDomain = (env: Env, server: ServerKey, domain: string, projectKey?: string) =>
  updateServerConfig(env, server, (current) => ({
    ...current,
    hosts: { ...current.hosts, [domain]: { ...current.hosts?.[domain] } },
    ...(projectKey === undefined ? {} : { projects: { ...current.projects, [projectKey]: domain } }),
  }));
