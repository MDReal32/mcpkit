import { join } from "node:path";
import { UPSTREAM_CACHE_DIR_NAME } from "./const";

/** `<dir>/upstream/<category>/<name>.json`, laid out like the manifests: `security:bitwarden` is `upstream/security/bitwarden.json`. */
export const resolveToolCachePath = (dir: string, serverId: string) => {
  const [category = "", name = ""] = serverId.split(":");
  return join(dir, UPSTREAM_CACHE_DIR_NAME, category, `${name}.json`);
};
