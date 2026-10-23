import { spawn } from "node:child_process";
import type { Target } from "@usemcpkit/binary";
import { describeError } from "@usemcpkit/core";
import { resolveBinaryFile } from "./resolve-binary-file";
import type { BinaryResult } from "./types/binary-result";

/** Cross-compiles the bundled entry with `bun build --compile`; resolves with the outcome instead of throwing. */
export const compileBinary = (entryFile: string, outDir: string, target: Target) => {
  const outfile = resolveBinaryFile(outDir, target);
  const args = ["build", entryFile, "--compile", "--minify", `--target=bun-${target}`, `--outfile=${outfile}`];
  return new Promise<BinaryResult>((resolve) => {
    const child = spawn("bun", args, { stdio: ["ignore", "ignore", "pipe"] });
    const stderr: string[] = [];
    child.stderr.on("data", (chunk: Buffer) => stderr.push(chunk.toString()));
    child.on("error", (error) => resolve({ target, outfile, error: `cannot run bun: ${describeError(error)}` }));
    child.on("close", (code) => {
      resolve(
        code === 0 ? { target, outfile } : { target, outfile, error: stderr.join("").trim() || `exit code ${code}` },
      );
    });
  });
};
