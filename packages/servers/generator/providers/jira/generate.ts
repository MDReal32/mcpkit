import { runGenerator } from '../../utils/pipeline/run-generator';
import { SERVER_DESCRIPTION, SERVER_GROUPS, SERVER_NAME, SPEC_SOURCES } from './const';
import { createSpecPlan } from './create-spec-plan';
import { mergeEditionPairs } from './merge-edition-pairs';

export const generate = (localPaths: readonly string[]) =>
  runGenerator(
    {
      serverName: SERVER_NAME,
      serverDescription: SERVER_DESCRIPTION,
      groups: SERVER_GROUPS.map((group) => group.name),
      specs: SPEC_SOURCES.map(createSpecPlan),
      finalizeTools: mergeEditionPairs,
    },
    localPaths,
  );
