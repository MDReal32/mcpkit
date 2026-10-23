import { DEFAULT_GROUP_ARRAY_SUFFIX } from '../naming/const';
import { writeGeneratedFiles } from '../render/write-generated-files';
import type { GeneratorConfig } from '../types/generator-config';
import type { Operation } from '../types/operation';
import type { SpecPlanResult } from '../types/spec-plan-result';
import { SERVERS_DIR } from './const';
import { keepAllTools } from './keep-all-tools';
import { planSpec } from './plan-spec';

export const runGenerator = async <Result extends Operation>(
  config: GeneratorConfig<Result>,
  localPaths: readonly string[],
) => {
  const { serverName, serverDescription, groups, specs, finalizeTools = keepAllTools } = config;
  const results: SpecPlanResult<Result>[] = [];
  for (const [position, spec] of specs.entries()) {
    results.push(await planSpec(spec, localPaths[position]));
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
