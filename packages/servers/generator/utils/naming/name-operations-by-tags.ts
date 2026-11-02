import type { Operation } from "../types/operation";
import { slugify } from "./slugify";
import { toToolNames } from "./to-tool-names";

/** Names each operation `<group>:<resource>:<action>` from its tags `[group, resource]` and its operation id. */
export const nameOperationsByTags = (operations: Operation[], groups: readonly string[]) =>
  operations.map(({ spec }) => {
    const [group = "", resource = ""] = spec.tags ?? [];
    if (!groups.includes(group) || resource === "") {
      throw new Error(`${spec.operationId}: tags must be [group, resource] with a group of ${groups.join(", ")}`);
    }
    return toToolNames(group, slugify(resource), slugify(spec.operationId ?? ""));
  });
