import type { Env } from "../../env";
import { loadConfig } from "./load-config";

export const readServerDomain = async (env: Env, serverName: string) => {
  const config = await loadConfig(env);
  return config.servers?.[serverName]?.domain;
};
