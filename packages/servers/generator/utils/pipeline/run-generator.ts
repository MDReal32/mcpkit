import { DEFAULT_GROUP_ARRAY_SUFFIX } from '../naming/const.ts';
import { writeGeneratedFiles } from '../render/write-generated-files.ts';
import type { GeneratorConfig } from '../types/generator-config.ts';
import type { Operation } from '../types/operation.ts';
import type { SpecPlanResult } from '../types/spec-plan-result.ts';
import { FIRST_LOCAL_PATH_ARGUMENT, SERVERS_DIR } from './const.ts';
import { keepAllTools } from './keep-all-tools.ts';
import { planSpec } from './plan-spec.ts';

export const runGenerator = async <Result extends Operation>(config: GeneratorConfig<Result>) => {
  const { serverName, serverDescription, groups, specs, finalizeTools = keepAllTools } = config;
  const results: SpecPlanResult<Result>[] = [];
  for (const [position, spec] of specs.entries()) {
    results.push(await planSpec(spec, process.argv[FIRST_LOCAL_PATH_ARGUMENT + position]));
  }
  const { tools: unsorted, notes } = finalizeTools(results.flatMap(({ planned }) => planned));
  const skipped = [...results.flatMap((result) => result.skipped), ...notes];
  const tools = [...unsorted].sort((a, b) => a.definition.name.localeCompare(b.definition.name));
  await writeGeneratedFiles(
    SERVERS_DIR,
    { serverName, serverDescription, groups, groupArraySuffix: config.groupArraySuffix ?? DEFAULT_GROUP_ARRAY_SUFFIX },
    tools,
  );
  process.stdout.write(`${serverName}: ${tools.length} tools\n`);
  process.stdout.write(`skipped ${skipped.length}:\n${skipped.map((line) => `  ${line}`).join('\n')}\n`);
};
