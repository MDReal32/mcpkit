import type { Env } from "../../env";
import { readConfig } from "./read-config";
import { resolveConfigFile } from "./resolve-config-file";

export const readServerDomain = async (env: Env, serverName: string) => {
  const config = await readConfig(resolveConfigFile(env));
  return config.servers?.[serverName]?.domain;
};
