import type { Env } from "../../env";
import { writeJsonFile } from "../secrets/write-json-file";
import type { McpkitConfig } from "../types/mcpkit-config";
import { readConfig } from "./read-config";
import { resolveConfigFile } from "./resolve-config-file";

export const saveServerDomain = async (env: Env, serverName: string, domain: string) => {
  const file = resolveConfigFile(env);
  const config = await readConfig(file);
  const updated: McpkitConfig = {
    ...config,
    servers: { ...config.servers, [serverName]: { ...config.servers?.[serverName], domain } },
  };
  await writeJsonFile(file, updated);
  return file;
};
