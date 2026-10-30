import { slugify } from "../../utils/naming/slugify";
import { toToolNames } from "../../utils/naming/to-tool-names";
import type { Operation } from "../../utils/types/operation";
import { SERVER_GROUPS } from "./const";

export const nameOperations = (operations: Operation[]) =>
  operations.map(({ spec }) => {
    const [group = "", resource = ""] = spec.tags ?? [];
    if (!SERVER_GROUPS.includes(group) || resource === "") {
      throw new Error(
        `${spec.operationId}: tags must be [group, resource] with a group of ${SERVER_GROUPS.join(", ")}`,
      );
    }
    return toToolNames(group, slugify(resource), slugify(spec.operationId ?? ""));
  });
