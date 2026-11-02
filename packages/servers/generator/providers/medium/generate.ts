import { assertUniqueIdentifiers } from "../../utils/pipeline/assert-unique-identifiers";
import { runGenerator } from "../../utils/pipeline/run-generator";
import { SERVER_DESCRIPTION, SERVER_GROUPS, SERVER_NAME } from "./const";
import { createSpecPlan } from "./create-spec-plan";

export const generate = (localPaths: readonly string[]) =>
  runGenerator(
    {
      serverName: SERVER_NAME,
      serverDescription: SERVER_DESCRIPTION,
      groups: SERVER_GROUPS,
      specs: [createSpecPlan()],
      finalizeTools: assertUniqueIdentifiers,
    },
    localPaths,
  );
