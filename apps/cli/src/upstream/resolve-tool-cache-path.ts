import { join } from "node:path";
import { UPSTREAM_CACHE_DIR_NAME } from "./const";

export const resolveToolCachePath = (dir: string, serverId: string) =>
  join(dir, UPSTREAM_CACHE_DIR_NAME, `${serverId.replace(":", "-")}.json`);
