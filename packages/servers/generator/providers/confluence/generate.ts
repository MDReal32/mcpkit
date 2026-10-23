import { runGenerator } from '../../utils/pipeline/run-generator';
import { assertUniqueIdentifiers } from './assert-unique-identifiers';
import { SERVER_DESCRIPTION, SERVER_NAME, SPEC_SOURCES } from './const';
import { createSpecPlan } from './create-spec-plan';

export const generate = (localPaths: readonly string[]) =>
  runGenerator(
    {
      serverName: SERVER_NAME,
      serverDescription: SERVER_DESCRIPTION,
      groups: SPEC_SOURCES.map((source) => source.group),
      groupArraySuffix: 'AllTools',
      specs: SPEC_SOURCES.map(createSpecPlan),
      finalizeTools: assertUniqueIdentifiers,
    },
    localPaths,
  );
