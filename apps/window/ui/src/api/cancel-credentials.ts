import { CREDENTIALS_FORM_API } from "@usemcpkit/core";
import { createSessionHeaders } from "./create-session-headers";
import { resolveApiUrl } from "./resolve-api-url";

export const cancelCredentials = async () => {
  await fetch(resolveApiUrl(CREDENTIALS_FORM_API.cancel), { method: "POST", headers: createSessionHeaders() });
};
