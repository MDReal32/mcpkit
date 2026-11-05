import { execFileSync } from "node:child_process";
import { RUNNER_CRATE } from "./const.ts";
import type { CargoMetadata } from "./types/cargo-metadata.ts";

/** The version of {@link RUNNER_CRATE}, the one `usemcpkit --version` prints and the updater compares with npm's. */
export const readCargoVersion = (workspaceRoot: string) => {
  const output = execFileSync("cargo", ["metadata", "--no-deps", "--format-version", "1"], {
    cwd: workspaceRoot,
    encoding: "utf8",
  });
  const metadata: CargoMetadata = JSON.parse(output);
  const runner = metadata.packages.find((cargoPackage) => cargoPackage.name === RUNNER_CRATE);
  if (runner === undefined) {
    throw new Error(`cargo metadata lists no ${RUNNER_CRATE} package`);
  }
  return runner.version;
};
