import { findGroupName } from "../../utils/naming/find-group-name";
import { slugify } from "../../utils/naming/slugify";
import { toKebabCase } from "../../utils/naming/to-kebab-case";
import { toToolNames } from "../../utils/naming/to-tool-names";
import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import { SERVER_GROUPS } from "./const";

/** Operation ids are camelCase (`getFileNodes`), so the action reads `get_file_nodes`. */
export const nameOperations = (operations: CategorizedOperation[]) =>
  operations.map(({ category, spec }) => {
    const group = findGroupName(SERVER_GROUPS, category);
    if (!group) {
      throw new Error(`${spec.operationId}: tag "${category}" belongs to no server group`);
    }
    return toToolNames(group, slugify(category), toKebabCase(spec.operationId ?? ""));
  });
