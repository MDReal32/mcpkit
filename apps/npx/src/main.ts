import { EXIT_NO_BINARY } from "./const";
import { resolveRunnerBinary } from "./resolve-runner-binary";
import { runBinary } from "./run-binary";

const binary = resolveRunnerBinary();
if (binary === undefined) {
  process.stderr.write(`usemcpkit: no binary is published for ${process.platform}-${process.arch}\n`);
  process.exit(EXIT_NO_BINARY);
}
process.exitCode = await runBinary(binary, process.argv.slice(2));
