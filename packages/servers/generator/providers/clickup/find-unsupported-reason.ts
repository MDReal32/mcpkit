import { MULTIPART_CONTENT_TYPE } from "../../utils/const";
import { isBinarySchema } from "../../utils/schema/is-binary-schema";
import { findBodyReason } from "../../utils/support/find-body-reason";
import type { CategorizedOperation } from "../../utils/types/categorized-operation";
import { SCHEMA_OPTIONS } from "./const";

export const findUnsupportedReason = (operation: CategorizedOperation) => {
  const multipart = operation.spec.requestBody?.content[MULTIPART_CONTENT_TYPE]?.schema;
  if (multipart && !Object.values(multipart.properties ?? {}).some(isBinarySchema)) {
    return "multipart/form-data body declares no file part";
  }
  return findBodyReason(operation, { schema: SCHEMA_OPTIONS });
};
