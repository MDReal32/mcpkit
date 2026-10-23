import { ALL_PROVIDERS } from "./utils/pipeline/const";
import { formatGeneratedFiles } from "./utils/pipeline/format-generated-files";
import { listProviders } from "./utils/pipeline/list-providers";
import { loadProvider } from "./utils/pipeline/load-provider";

const [requested = ALL_PROVIDERS, ...localPaths] = process.argv.slice(2);
const providers = await listProviders();

if (requested !== ALL_PROVIDERS && !providers.includes(requested)) {
  process.stderr.write(
    `unknown provider "${requested}", expected "${ALL_PROVIDERS}" or one of: ${providers.join(", ")}\n`,
  );
  process.exit(1);
}

if (requested === ALL_PROVIDERS && localPaths.length > 0) {
  process.stderr.write("local spec paths need a provider name, they are matched to that provider's specs in order\n");
  process.exit(1);
}

for (const name of requested === ALL_PROVIDERS ? providers : [requested]) {
  const generate = await loadProvider(name);
  await generate(localPaths);
}

await formatGeneratedFiles();
