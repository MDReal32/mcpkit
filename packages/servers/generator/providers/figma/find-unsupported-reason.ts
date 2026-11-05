import { findBodyReason } from "../../utils/support/find-body-reason";
import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import { acceptsPersonalToken } from "./accepts-personal-token";
import { SCHEMA_OPTIONS } from "./const";

export const findUnsupportedReason = (operation: CategorizedOperation) => {
  if (!acceptsPersonalToken(operation.spec)) {
    return "does not accept a personal access token, and the server authenticates with one";
  }
  return findBodyReason(operation, { schema: SCHEMA_OPTIONS });
};
