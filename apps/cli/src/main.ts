import { describeError } from "@usemcpkit/core";
import { printError, runCli } from "./cli";

try {
  await runCli(process.argv.slice(2));
} catch (error) {
  printError(`mcpkit: ${describeError(error)}`);
  process.exitCode = 1;
}
