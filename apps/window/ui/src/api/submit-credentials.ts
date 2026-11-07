import type { CredentialResponse } from "@usemcpkit/core";
import { CREDENTIALS_FORM_API } from "@usemcpkit/core";
import { postFormJson } from "./post-form-json";

export const submitCredentials = (answer: CredentialResponse, requestFailed: string) =>
  postFormJson(CREDENTIALS_FORM_API.submit, answer, requestFailed);
