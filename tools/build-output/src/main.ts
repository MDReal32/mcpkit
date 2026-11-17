import { join } from "node:path";
import { collectBuildOutput } from "./collect-build-output";

const outputDir = await collectBuildOutput(join(import.meta.dirname, "../../.."));
process.stdout.write(`build output collected in ${outputDir}\n`);
