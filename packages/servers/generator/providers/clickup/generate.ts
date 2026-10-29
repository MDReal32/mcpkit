import { assertUniqueIdentifiers } from "../../utils/pipeline/assert-unique-identifiers";
import { runGenerator } from "../../utils/pipeline/run-generator";
import { SERVER_DESCRIPTION, SERVER_GROUPS, SERVER_NAME, SPEC_URLS } from "./const";
import { createSpecPlan } from "./create-spec-plan";

export const generate = (localPaths: readonly string[]) =>
  runGenerator(
    {
      serverName: SERVER_NAME,
      serverDescription: SERVER_DESCRIPTION,
      groups: SERVER_GROUPS.map((group) => group.name),
      specs: SPEC_URLS.map((url) => createSpecPlan(url)),
      finalizeTools: assertUniqueIdentifiers,
    },
    localPaths,
  );
