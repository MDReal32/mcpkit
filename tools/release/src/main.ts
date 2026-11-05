import { join, resolve } from "node:path";
import { writeRelease } from "./write-release.ts";

const [binariesDir, outputDir] = process.argv.slice(2);
if (binariesDir === undefined || outputDir === undefined) {
  process.stderr.write("usage: node tools/release/src/main.ts <binaries dir> <output dir>\n");
  process.exit(1);
}
const version = await writeRelease(join(import.meta.dirname, "../../.."), resolve(binariesDir), resolve(outputDir));
process.stdout.write(`release ${version} written to ${resolve(outputDir)}\n`);
