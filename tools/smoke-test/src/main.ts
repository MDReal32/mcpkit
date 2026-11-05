import { resolve } from "node:path";
import { runSmokeTest } from "./run-smoke-test.ts";

const [runner, registryDir] = process.argv.slice(2);
if (runner === undefined || registryDir === undefined) {
  process.stderr.write("usage: node tools/smoke-test/src/main.ts <usemcpkit binary> <registry dir>\n");
  process.exit(1);
}
const serverCount = await runSmokeTest(resolve(runner), resolve(registryDir));
process.stdout.write(`${resolve(runner)} served ${serverCount} sections and opened git:github\n`);
