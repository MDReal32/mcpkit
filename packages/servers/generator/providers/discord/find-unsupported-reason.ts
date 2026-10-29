import { findBodyReason } from "../../utils/support/find-body-reason";
import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import { acceptsBotToken } from "./accepts-bot-token";
import { SCHEMA_OPTIONS } from "./const";

export const findUnsupportedReason = (operation: CategorizedOperation) => {
  if (!acceptsBotToken(operation.spec)) {
    return "accepts only an OAuth2 user access token, and the server authenticates as a bot";
  }
  return findBodyReason(operation, { schema: SCHEMA_OPTIONS });
};
