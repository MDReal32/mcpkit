import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { BUILD_OUTPUT_DIR, CARGO_RELEASE_DIR, PROJECT_BUILDS, RELEASE_BINARIES } from "./const.ts";
import { toExecutableName } from "./to-executable-name.ts";

/**
 * Replaces `<workspaceRoot>/build` with a copy of every project's build and the Rust release binaries. The projects
 * keep their own build folders, since npm packs only what is inside a package and `exports` cannot leave it.
 */
export const collectBuildOutput = async (workspaceRoot: string) => {
  const outputDir = join(workspaceRoot, BUILD_OUTPUT_DIR);
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
  for (const build of PROJECT_BUILDS) {
    await cp(join(workspaceRoot, build.from), join(outputDir, build.to), { recursive: true });
  }
  for (const binary of RELEASE_BINARIES) {
    const file = toExecutableName(binary);
    await cp(join(workspaceRoot, CARGO_RELEASE_DIR, file), join(outputDir, file));
  }
  return outputDir;
};
