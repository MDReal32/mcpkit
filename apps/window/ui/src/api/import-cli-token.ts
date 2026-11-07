import type { TokenImportRequest } from "@usemcpkit/core";
import { CREDENTIALS_FORM_API } from "@usemcpkit/core";
import { postFormJson } from "./post-form-json";

export const importCliToken = (request: TokenImportRequest, requestFailed: string) =>
  postFormJson(CREDENTIALS_FORM_API.import, request, requestFailed);
