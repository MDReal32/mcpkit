import { runGenerator } from '../../utils/pipeline/run-generator.ts';
import { assertUniqueIdentifiers } from './assert-unique-identifiers.ts';
import { SERVER_DESCRIPTION, SERVER_NAME, SPEC_SOURCES } from './const.ts';
import { createSpecPlan } from './create-spec-plan.ts';

await runGenerator({
  serverName: SERVER_NAME,
  serverDescription: SERVER_DESCRIPTION,
  groups: SPEC_SOURCES.map((source) => source.group),
  groupArraySuffix: 'AllTools',
  specs: SPEC_SOURCES.map(createSpecPlan),
  finalizeTools: assertUniqueIdentifiers,
});
