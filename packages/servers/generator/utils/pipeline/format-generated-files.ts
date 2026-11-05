import { execFile } from "node:child_process";
import { createRequire } from "node:module";
import { promisify } from "node:util";
import { SERVERS_DIR } from "./const";

const run = promisify(execFile);

/** Runs Biome's own launcher with this Node, since `execFile` cannot start `yarn.cmd` or `biome.cmd` on Windows. */
export const formatGeneratedFiles = async () => {
  const biome = createRequire(import.meta.url).resolve("@biomejs/biome/bin/biome");
  const { stdout } = await run(process.execPath, [biome, "check", "--write", SERVERS_DIR], { cwd: SERVERS_DIR });
  process.stdout.write(stdout);
};
