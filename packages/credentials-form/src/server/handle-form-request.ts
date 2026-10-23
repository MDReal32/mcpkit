import type { IncomingMessage, ServerResponse } from "node:http";
import { CREDENTIALS_FORM_API } from "@usemcpkit/core";
import { submitAnswer } from "../submit-answer";
import { importToken } from "../token-import/import-token";
import type { FormSession } from "../types/form-session";
import { isSessionRequest } from "./is-session-request";
import { sendJson } from "./send-json";

export const handleFormRequest = async (session: FormSession, incoming: IncomingMessage, response: ServerResponse) => {
  const route = `${incoming.method} ${new URL(incoming.url ?? "/", "http://form").pathname}`;
  const isPage = route === "GET /";
  if (!isSessionRequest(session, incoming, !isPage)) {
    sendJson(response, 403, { errors: ["this request does not belong to the open credentials form"] });
    return;
  }
  if (isPage) {
    response
      .writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" })
      .end(session.page);
    return;
  }
  if (route === `POST ${CREDENTIALS_FORM_API.submit}`) {
    await submitAnswer(session, incoming, response);
    return;
  }
  if (route === `POST ${CREDENTIALS_FORM_API.import}`) {
    await importToken(session, incoming, response);
    return;
  }
  if (route === `POST ${CREDENTIALS_FORM_API.cancel}`) {
    sendJson(response, 200, {});
    session.cancel();
    return;
  }
  sendJson(response, 404, { errors: ["not found"] });
};
