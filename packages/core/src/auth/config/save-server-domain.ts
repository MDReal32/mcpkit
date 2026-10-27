import type { Env } from "../../env";
import { updateServerConfig } from "./update-server-config";

export const saveServerDomain = (env: Env, serverName: string, domain: string) =>
  updateServerConfig(env, serverName, (current) => ({ ...current, domain }));
