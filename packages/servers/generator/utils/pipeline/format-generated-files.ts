import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { SERVERS_DIR } from "./const";

const run = promisify(execFile);

export const formatGeneratedFiles = async () => {
  const { stdout } = await run("yarn", ["biome", "check", "--write", SERVERS_DIR], { cwd: SERVERS_DIR });
  process.stdout.write(stdout);
};
