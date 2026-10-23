import { runGenerator } from '../../utils/pipeline/run-generator.ts';
import { SERVER_DESCRIPTION, SERVER_GROUPS, SERVER_NAME, SPEC_SOURCES } from './const.ts';
import { createSpecPlan } from './create-spec-plan.ts';
import { mergeEditionPairs } from './merge-edition-pairs.ts';

await runGenerator({
  serverName: SERVER_NAME,
  serverDescription: SERVER_DESCRIPTION,
  groups: SERVER_GROUPS.map((group) => group.name),
  specs: SPEC_SOURCES.map(createSpecPlan),
  finalizeTools: mergeEditionPairs,
});
