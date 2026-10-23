import { runGenerator } from '../../utils/pipeline/run-generator.ts';
import { SERVER_DESCRIPTION, SERVER_GROUPS, SERVER_NAME } from './const.ts';
import { createSpecPlan } from './create-spec-plan.ts';

await runGenerator({
  serverName: SERVER_NAME,
  serverDescription: SERVER_DESCRIPTION,
  groups: SERVER_GROUPS.map((group) => group.name),
  specs: [createSpecPlan()],
});
