import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

/** `v<version>` from `usemcpkit --version`, the folder of `~/.usemcpkit/manifests` that this binary caches into. */
export const readRegistryVersionDir = async (runner: string) => {
  const { stdout } = await run(runner, ["--version"]);
  const version = stdout.trim().split(/\s+/).at(-1);
  if (version === undefined || version.length === 0) {
    throw new Error(`${runner} --version printed no version: ${stdout}`);
  }
  return `v${version}`;
};
