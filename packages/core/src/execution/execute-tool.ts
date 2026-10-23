import type { Manifest, ToolArgs, ToolSpec } from "../manifest";
import { mapResponse } from "../mapping";
import { sendWithAuthFallback } from "./auth-fallback/send-with-auth-fallback";
import { DEFAULT_TIMEOUT_MS } from "./const";
import type { ExecuteOptions } from "./execute-options";
import { loadFileArgs } from "./request/load-file-args";
import { prepareToolArgs } from "./request/prepare-tool-args";
import { readApiErrorMessage } from "./response/read-api-error-message";
import { readResponseBody } from "./response/read-response-body";
import { ToolError } from "./tool-error";
import type { CallContext } from "./types/call-context";

export const executeTool = async (
  manifest: Manifest,
  tool: ToolSpec,
  rawArgs: ToolArgs | undefined,
  { fetchImpl = fetch, timeoutMs = DEFAULT_TIMEOUT_MS, env = process.env, ...hooks }: ExecuteOptions = {},
) => {
  const args = await loadFileArgs(tool, prepareToolArgs(tool, rawArgs));
  const context: CallContext = {
    env,
    fetchImpl,
    timeoutMs,
    ...hooks,
  };
  const { response, tool: sentTool } = await sendWithAuthFallback(manifest, tool, args, context);
  const body = await readResponseBody(response);
  if (!response.ok) {
    throw new ToolError(`${manifest.name} API ${response.status}: ${readApiErrorMessage(body)}`.trim());
  }
  return mapResponse(body, sentTool.response);
};
