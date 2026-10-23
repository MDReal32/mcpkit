import type { IncomingMessage, ServerResponse } from "node:http";
import { describeError, isValidCredentialResponse, validateCredentialResponse } from "@usemcpkit/core";
import { readJsonBody } from "./server/read-json-body";
import { sendJson } from "./server/send-json";
import type { FormSession } from "./types/form-session";

export const submitAnswer = async (session: FormSession, incoming: IncomingMessage, response: ServerResponse) => {
  let body: unknown;
  try {
    body = await readJsonBody(incoming);
  } catch (error) {
    sendJson(response, 400, { errors: [describeError(error)] });
    return;
  }
  if (!isValidCredentialResponse(session.request, body)) {
    sendJson(response, 400, { errors: validateCredentialResponse(session.request, body) });
    return;
  }
  sendJson(response, 200, {});
  session.answer(body);
};
