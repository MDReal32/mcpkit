import { findGroupName } from "../../utils/naming/find-group-name";
import { slugify } from "../../utils/naming/slugify";
import { toToolNames } from "../../utils/naming/to-tool-names";
import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import { SERVER_GROUPS } from "./const";
import { toActionFile } from "./to-action-file";

/** Actions are named after the summary: many operationIds run words together (`Gettimeentrieswithinadaterange`). */
export const nameOperations = (operations: CategorizedOperation[]) =>
  operations.map(({ category, spec }) => {
    const group = findGroupName(SERVER_GROUPS, category);
    if (!group) {
      throw new Error(`${spec.operationId}: category "${category}" belongs to no server group`);
    }
    return toToolNames(group, slugify(category), toActionFile(spec.summary ?? spec.operationId ?? ""));
  });
