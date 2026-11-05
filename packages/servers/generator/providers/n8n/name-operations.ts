import { findGroupName } from "../../utils/naming/find-group-name";
import { toKebabCase } from "../../utils/naming/to-kebab-case";
import { toToolNames } from "../../utils/naming/to-tool-names";
import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import { SERVER_GROUPS, TAG_RESOURCES } from "./const";

/** Operation ids are camelCase (`getWorkflows`), so the action reads `get_workflows`. */
export const nameOperations = (operations: CategorizedOperation[]) =>
  operations.map(({ category, spec }) => {
    const group = findGroupName(SERVER_GROUPS, category);
    const resource = TAG_RESOURCES[category];
    if (!group || !resource) {
      throw new Error(`${spec.operationId}: tag "${category}" belongs to no server group or resource`);
    }
    return toToolNames(group, resource, toKebabCase(spec.operationId ?? ""));
  });
