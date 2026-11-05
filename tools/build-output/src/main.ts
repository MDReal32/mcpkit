import { join } from "node:path";
import { collectBuildOutput } from "./collect-build-output.ts";

const outputDir = await collectBuildOutput(join(import.meta.dirname, "../../.."));
process.stdout.write(`build output collected in ${outputDir}\n`);
