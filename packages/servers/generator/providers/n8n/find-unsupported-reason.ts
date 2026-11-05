import { findBodyReason } from "../../utils/support/find-body-reason";
import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import { acceptsApiKey } from "./accepts-api-key";
import { SCHEMA_OPTIONS } from "./const";

export const findUnsupportedReason = (operation: CategorizedOperation) => {
  if (!acceptsApiKey(operation.spec)) {
    return "does not accept an API key, and the server authenticates with one";
  }
  if (operation.spec.deprecated) {
    return "is deprecated";
  }
  return findBodyReason(operation, { schema: SCHEMA_OPTIONS });
};
