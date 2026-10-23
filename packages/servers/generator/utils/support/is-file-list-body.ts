import { MULTIPART_CONTENT_TYPE } from "../const";
import type { SelectedBodyContent } from "../types/selected-body-content";

export const isFileListBody = ({ contentType, schema }: SelectedBodyContent) =>
  contentType === MULTIPART_CONTENT_TYPE && schema.type === "array";
