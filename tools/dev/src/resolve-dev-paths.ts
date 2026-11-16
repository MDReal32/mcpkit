import { join } from "node:path";
import { DEV_HOME_SEGMENTS, REGISTRY_SEGMENTS, RELEASE_SEGMENTS } from "./const.ts";
import type { DevPaths } from "./types/dev-paths.ts";

export const resolveDevPaths = (workspaceRoot: string) => {
  const home = join(workspaceRoot, ...DEV_HOME_SEGMENTS);
  const paths: DevPaths = {
    home,
    binDir: join(home, "bin"),
    registryDir: join(workspaceRoot, ...REGISTRY_SEGMENTS),
    releaseDir: join(workspaceRoot, ...RELEASE_SEGMENTS),
  };
  return paths;
};
