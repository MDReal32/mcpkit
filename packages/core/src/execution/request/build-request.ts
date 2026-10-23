import type { ResolvedAuth } from "../../auth";
import type { Manifest, ToolArgs, ToolSpec } from "../../manifest";
import type { HttpRequest } from "../response/http-request";
import { buildBodyPayload } from "./build-body-payload";
import { buildRequestUrl } from "./build-request-url";
import { collectArgs } from "./collect-args";
import { fillPath } from "./fill-path";

/** Expects args already passed through prepareToolArgs. */
export const buildRequest = (manifest: Manifest, tool: ToolSpec, args: ToolArgs, auth: ResolvedAuth) => {
  const { method, path, query, fixedQuery } = tool.request;
  const payload = buildBodyPayload(tool.request, args);
  const hasBody = method !== "GET" && payload !== undefined;
  const contentHeaders: HttpRequest["headers"] = hasBody ? { "Content-Type": "application/json" } : {};
  const params = { ...fixedQuery, ...collectArgs(query, args), ...auth.query };
  const request: HttpRequest = {
    url: buildRequestUrl(manifest.baseUrl, fillPath(path, args), params),
    method,
    headers: { ...manifest.headers, ...auth.headers, ...contentHeaders },
    ...(hasBody ? { body: JSON.stringify(payload) } : {}),
  };
  return request;
};
