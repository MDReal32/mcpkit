import type { ResolvedAuth } from "../../auth";
import type { Manifest, ToolArgs, ToolSpec } from "../../manifest";
import type { HttpRequest } from "../response/http-request";
import { buildBodyPayload } from "./build-body-payload";
import { buildRequestUrl } from "./build-request-url";
import { collectArgs } from "./collect-args";
import { JSON_CONTENT_TYPE } from "./const";
import { fillPath } from "./fill-path";
import { serializeBody } from "./serialize-body";

/** Expects args already passed through prepareToolArgs. */
export const buildRequest = (manifest: Manifest, tool: ToolSpec, args: ToolArgs, auth: ResolvedAuth) => {
  const { method, path, query, fixedQuery, fixedHeaders, contentType = JSON_CONTENT_TYPE } = tool.request;
  const payload = buildBodyPayload(tool.request, args);
  const hasBody = method !== "GET" && payload !== undefined;
  const contentHeaders: HttpRequest["headers"] = hasBody ? { "Content-Type": contentType } : {};
  const params = { ...fixedQuery, ...collectArgs(query, args), ...auth.query };
  const request: HttpRequest = {
    url: buildRequestUrl(manifest.baseUrl, fillPath(path, args), params),
    method,
    headers: { ...manifest.headers, ...fixedHeaders, ...auth.headers, ...contentHeaders },
    ...(hasBody ? { body: serializeBody(payload, contentType) } : {}),
  };
  return request;
};
