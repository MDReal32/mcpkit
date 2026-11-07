import { CREDENTIALS_FORM_SESSION_HEADER } from "@usemcpkit/core";
import { readSessionToken } from "./read-session-token";

export const createSessionHeaders = () => ({
  [CREDENTIALS_FORM_SESSION_HEADER]: readSessionToken(),
  "Content-Type": "application/json",
});
