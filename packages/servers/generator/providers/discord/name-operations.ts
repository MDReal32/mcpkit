import { findGroupName } from "../../utils/naming/find-group-name";
import { slugify } from "../../utils/naming/slugify";
import { toToolNames } from "../../utils/naming/to-tool-names";
import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import { SERVER_GROUPS } from "./const";
import { toResource } from "./to-resource";

/** A category folded into a group of another name (`interactions` in `applications`) is the resource itself. */
export const nameOperations = (operations: CategorizedOperation[]) =>
  operations.map(({ category, path, spec }) => {
    const group = findGroupName(SERVER_GROUPS, category);
    if (!group) {
      throw new Error(`${spec.operationId}: path category "${category}" belongs to no server group`);
    }
    const resource = category === group ? toResource(path) : slugify(category);
    return toToolNames(group, resource, slugify(spec.operationId ?? ""));
  });
