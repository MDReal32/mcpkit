import type { ResolvedAuth } from "../../auth";
import type { Manifest, ToolArgs, ToolSpec } from "../../manifest";
import { expandJsonPaths } from "../json/expand-json-paths";
import type { HttpRequest } from "../response/http-request";
import { buildRequestUrl } from "./build-request-url";
import { collectArgs } from "./collect-args";
import { fillPath } from "./fill-path";

/** Expects args already passed through prepareToolArgs. */
export const buildRequest = (manifest: Manifest, tool: ToolSpec, args: ToolArgs, auth: ResolvedAuth) => {
  const { method, path, query, body, fixedQuery, fixedBody } = tool.request;
  const payload = { ...fixedBody, ...collectArgs(body, args) };
  const hasBody = method !== "GET" && Object.keys(payload).length > 0;
  const contentHeaders: HttpRequest["headers"] = hasBody ? { "Content-Type": "application/json" } : {};
  const params = { ...fixedQuery, ...collectArgs(query, args), ...auth.query };
  const request: HttpRequest = {
    url: buildRequestUrl(manifest.baseUrl, fillPath(path, args), params),
    method,
    headers: { ...manifest.headers, ...auth.headers, ...contentHeaders },
    ...(hasBody ? { body: JSON.stringify(expandJsonPaths(payload)) } : {}),
  };
  return request;
};
