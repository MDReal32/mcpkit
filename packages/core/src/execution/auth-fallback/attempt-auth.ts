import type { AuthResolution } from "../../auth";
import { describeError } from "../../errors";
import type { ToolArgs, ToolSpec } from "../../manifest";
import { HTTP_UNAUTHORIZED } from "../const";
import { buildRequest } from "../request/build-request";
import { readApiErrorMessage } from "../response/read-api-error-message";
import { readResponseBody } from "../response/read-response-body";
import { sendRequest } from "../response/send-request";
import type { CallContext } from "../types/call-context";
import { rejectAuthAttempt } from "./reject-auth-attempt";
import type { AuthAttempt } from "./types/auth-attempt";
import type { AuthCandidate } from "./types/auth-candidate";

/** A candidate fails when its credentials are unavailable (unset env var, no stored token) or the API answers 401. */
export const attemptAuth = async (candidate: AuthCandidate, tool: ToolSpec, args: ToolArgs, context: CallContext) => {
  let resolution: AuthResolution;
  try {
    resolution = await candidate.resolve();
  } catch (error) {
    return rejectAuthAttempt(describeError(error));
  }
  const sentTool = resolution.manifest.tools.find((candidate) => candidate.name === tool.name) ?? tool;
  const response = await sendRequest(buildRequest(resolution.manifest, sentTool, args, resolution.auth), context);
  if (response.status === HTTP_UNAUTHORIZED) {
    const message = readApiErrorMessage(await readResponseBody(response));
    return rejectAuthAttempt([`API answered ${HTTP_UNAUTHORIZED}`, message].filter(Boolean).join(": "));
  }
  await resolution.commit?.();
  const attempt: AuthAttempt = { accepted: true, response, tool: sentTool };
  return attempt;
};
